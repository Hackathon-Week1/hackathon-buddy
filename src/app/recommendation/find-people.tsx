"use client";

import { useState } from "react";

export default function FindPeople() {
  const [people, setPeople] = useState([]);

  async function handleMatch() {
    const userId = "9ccc801d-f4fe-4799-bb3f-e11c365bce4e";
    const targetSkills = [
      "AI/ML",
      "Cybersecurity",
      "Hardware",
      "Front-end",
      "Back-end",
    ];
    const response = await fetch(
      `/recommendation?user_id=${userId}&target_skills=${targetSkills.join(
        ","
      )}`
    );
    const data = await response.json();
    setPeople(data);
  }

  return (
    <div>
      <button
        onClick={handleMatch}
        className="border border-white py-1 px-2 rounded-lg bg-red-500 hover:bg-red-700 text-black duration-200">
        Search
      </button>
      <ul>
        {people.map((person: any) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}
