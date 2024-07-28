from supabase import create_client, Client
import openai
from dotenv import load_dotenv
import os
import pandas as pd
from flask import Flask, request, jsonify

load_dotenv(dotenv_path = '../.env.local')

SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

openai.api_key = os.getenv('OPENAI_API_KEY')


#Loads the data from the supabase
def fetch_data():
    response = supabase.table("users_profile").select("*").execute()
    return response.data

def get_openai_similarity_score(user_profile, target_skills):
    user_profile_text = f"Skills: {', '.join(user_profile['user_skills'])}\nInterests: {', '.join(user_profile['user_ind_interest'])}\nSpecialties: {', '.join(user_profile['user_specialty'])}"
    target_skills_text = f"Looking for skills: {', '.join(target_skills)}"

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Analyze the following user profile and compare it to the target skills. Provide a similarity score between 0 and 1:\n\nUser Profile:\n{user_profile_text}\n\nTarget Skills:\n{target_skills_text}\n\nScore:",
        max_tokens=50
    )

    if response.choices and response.choices[0].text.strip().replace('.', '', 1).isdigit():
        score = float(response.choices[0].text.strip())
        return score
    else:
        raise ValueError("Invalid response from OpenAI")

def calculate_match_score(user, target_skills):
    openai_score = get_openai_similarity_score(user, target_skills)
    return openai_score

def find_matches(users, target_skills, user_location):
    matches = []
    for user in users:
        if user['user_location'] == user_location:
                score = calculate_match_score(user, target_skills)
                matches.append({
                    'user_name': user['user_name'],
                    'score': score
                    })
    matches.sort(key=lambda x: x['score'], reverse=True)
    return matches



###

# Flask app
app = Flask(__name__)

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')
    target_skills = request.args.get('target_skills', '').split(',')

    if not user_id or not target_skills:
        return jsonify({"error": "Missing user_id or target_skills"}), 400

    users = fetch_data()

    #retrieves data of the user
    user_index = next((index for (index, d) in enumerate(users) if d["user_id"] == user_id), None)

    if user_index is None:
        return jsonify({"error": "User not found"}), 404
    
    user_location = user_index['user_location']
    recommendations = find_matches(users, target_skills, user_location)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)