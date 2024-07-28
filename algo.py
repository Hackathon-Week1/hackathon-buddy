from supabase import create_client, Client
from openai import OpenAI
from dotenv import load_dotenv
import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv(dotenv_path = '.env.local')

SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


#Loads the data from the supabase
def fetch_data():
    response = supabase.table("users_profile").select("*").execute()
    return response.data

def get_openai_similarity_score(user_profile, target_skills):
    user_profile_text = f"Skills: {', '.join(user_profile['skills'])}\nInterests: {', '.join(user_profile['industry'])}"
    target_skills_text = f"Looking for skills: {', '.join(target_skills)}"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a skill matching assistant."},
            {"role": "user", "content": f"Analyze the following user profile and compare it to the target skills. On a scale of 0 to 1, give a similarity score. Your first line of answer should be the similarity score floating number!\n\nUser Profile:\n{user_profile_text}\n\nTarget Skills:\n{target_skills_text}\n\nScore:"}
            ])
    print(f"OPENAI response:\n{response}")


    response_text = response.choices[0].message.content
    first_line = response_text.split('\n')[0]
    if first_line.replace('.', '', 1).isdigit():
        score = float(first_line)
        return score
    else:
        raise ValueError("Invalid response from OpenAI")

def calculate_match_score(user, target_skills):
    openai_score = get_openai_similarity_score(user, target_skills)
    return openai_score

def find_matches(users, target_skills, user_location):
    matches = []
    for user in users:
        if user['location'] == user_location:
                score = calculate_match_score(user, target_skills)
                matches.append({
                    'name': user['name'],
                    'score': score
                    })
    matches.sort(key=lambda x: x['score'], reverse=True)
    return matches

###
# Flask app
app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['GET'])
def recommend():
    users = fetch_data()
    print(users)
    user_id =  '444948db-e621-4284-b3c7-b5f5c62a7882' #supabase.auth.get_user()
    #target_skills = request.args.get('target_skills', '').split(',')

    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    print("User ID requested:", user_id)
    print("Users fetched:")
    for user in users:
        print(f"- {user['id']}")

    #retrieves data of the user
    user_index = next((user for user in users if user["id"] == user_id), None)
    target_skills = user_index['seek']

    if not target_skills:
        return jsonify({"error": "Missing target_skills"}), 400

    print(f"The user index is: \n{user_index}")


    if user_index is None:
        return jsonify({"error": "User not found"}), 404

    user_location = user_index['location']
    recommendations = find_matches(users, target_skills, user_location)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)
