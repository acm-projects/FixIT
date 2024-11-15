import React, { createContext, useState, useContext } from 'react';
import { Text } from 'react-native';

// Create the context
export const ProfileContext = createContext();

// Rename the component to start with a capital letter
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'User Name',
    email: 'User Email',
    major: 'User Major',
    classYear: 'User Class year',
    profilePicture: 'https://via.placeholder.com/150',
    backgroundImage: 'https://via.placeholder.com/600x200',
  });

  const [savedPosts, setSavedPosts] = useState([]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        savedPosts,
        setSavedPosts
      }}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </ProfileContext.Provider>
  );
};

// Create a separate component for the hook usage
export const UseProfileComponent = ({ children }) => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return children(context);
};

// Create the hook as a separate function
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};