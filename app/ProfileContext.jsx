import React, { createContext, useState } from 'react';
import { Text } from 'react-native';  // Import Text component

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

  const [savedPosts, setSavedPosts] = useState([]);

  // Make sure children is properly rendered
  return (
    <ProfileContext.Provider 
      value={{ 
        profile, 
        setProfile,
        savedPosts,
        setSavedPosts  // Make sure this is included in the value prop
      }}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};