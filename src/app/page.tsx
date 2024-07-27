"use client";

import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const SignUpPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userSkills, setUserSkills] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userAgeBracket, setUserAgeBracket] = useState('');
  const [userIndInterest, setUserIndInterest] = useState('');
  const [userSpecialty, setUserSpecialty] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('User')
      .insert([
        {
          user_name: userName,
          user_pw: userPw,
          users_skills: userSkills,
          user_location: userLocation,
          user_age_bracket: userAgeBracket,
          user_ind_interest: userIndInterest,
          user_specialty: userSpecialty,
        },
      ]);

    if (error) {
      console.error(error);
    } else {
      console.log('User created:', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        />
      </label>
      <label>
        Skills:
        <input
          type="text"
          value={userSkills}
          onChange={(e) => setUserSkills(e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={userLocation}
          onChange={(e) => setUserLocation(e.target.value)}
        />
      </label>
      <label>
        Age Bracket:
        <input
          type="text"
          value={userAgeBracket}
          onChange={(e) => setUserAgeBracket(e.target.value)}
        />
      </label>
      <label>
        Industry Interest:
        <input
          type="text"
          value={userIndInterest}
          onChange={(e) => setUserIndInterest(e.target.value)}
        />
      </label>
      <label>
        Specialty:
        <input
          type="text"
          value={userSpecialty}
          onChange={(e) => setUserSpecialty(e.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpPage;

