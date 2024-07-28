"use client";

import { useFormState } from "react-dom";
import { profileAction } from "@/server/profile";

export default function ProfileForm() {
  const [state, submitProfile] = useFormState(profileAction, null);
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <form
        action={submitProfile}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Form</h2>
        {state?.error && (
          <div className="text-red-500 text-sm">{state.error}</div>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {state?.fieldError?.name && (
            <div className="text-red-500 text-sm">{state.fieldError.name}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {state?.fieldError?.city && (
            <div className="text-red-500 text-sm">{state.fieldError.city}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="state">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {state?.fieldError?.state && (
            <div className="text-red-500 text-sm">{state.fieldError.state}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {state?.fieldError?.country && (
            <div className="text-red-500 text-sm">
              {state.fieldError.country}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="industry">
            Industry Interests
          </label>
          <div className="flex flex-wrap">
            {["Fintech", "Healthcare", "Government", "Media"].map(
              (interest) => (
                <label key={interest} className="mr-4">
                  <input
                    type="checkbox"
                    name="industry"
                    value={interest}
                    className="mr-2"
                  />
                  {interest}
                </label>
              )
            )}
          </div>
          {state?.fieldError?.industry && (
            <div className="text-red-500 text-sm">
              {state.fieldError.industry}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="specialty">
            Your skills
          </label>
          <div className="flex flex-wrap">
            {[
              "AI/ML",
              "Cybersecurity",
              "Hardware",
              "Cloud",
              "Front-end",
              "Back-end",
              "Full-stack",
            ].map((skills) => (
              <label key={skills} className="mr-4">
                <input
                  type="checkbox"
                  name="skills"
                  value={skills}
                  className="mr-2"
                />
                {skills}
              </label>
            ))}
          </div>
          {state?.fieldError?.skills && (
            <div className="text-red-500 text-sm">
              {state.fieldError.skills}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="seek">
            Skills that you are looking for in your teammates
          </label>
          <div className="flex flex-wrap">
            {[
              "AI/ML",
              "Cybersecurity",
              "Hardware",
              "Cloud",
              "Front-end",
              "Back-end",
              "Full-stack",
            ].map((skills) => (
              <label key={skills} className="mr-4">
                <input
                  type="checkbox"
                  name="seek"
                  value={skills}
                  className="mr-2"
                />
                {skills}
              </label>
            ))}
          </div>
          {state?.fieldError?.seek && (
            <div className="text-red-500 text-sm">{state.fieldError.seek}</div>
          )}
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
