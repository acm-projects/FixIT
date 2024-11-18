import React, { createContext, useState, useContext } from 'react';

// Create the context
export const ProfileContext = createContext();

// Create the provider component
const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'User Name',
    email: 'User Email',
    major: 'User Major',
    classYear: 'User Class Year',
    profilePicture: 'https://via.placeholder.com/150',
    backgroundImage: 'https://via.placeholder.com/600x200',
  });

  const [savedPosts, setSavedPosts] = useState([]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, savedPosts, setSavedPosts }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Hook to use the ProfileContext
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

// Default export of the provider component
export default ProfileProvider;
