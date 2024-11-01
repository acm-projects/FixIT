// ProfileContext.js
import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'User Name',
    email: 'User Email',
    major: 'User Major',
    classYear: 'User Class year',
    profilePicture: 'https://via.placeholder.com/150',
    backgroundImage: 'https://via.placeholder.com/600x200',
  });

  const [savedPosts, setSavedPosts] = useState([]); // New state for saved posts

  return (
    <ProfileContext.Provider value={{ profile, setProfile, savedPosts, setSavedPosts }}>
      {children}
    </ProfileContext.Provider>
  );
};
