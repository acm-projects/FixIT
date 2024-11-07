import React, { createContext, useState, useCallback, useMemo } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  // Initial profile state with default values
  const [profile, setProfile] = useState({
    name: 'User Name',
    email: 'User Email',
    major: 'User Major',
    classYear: 'User Class year',
    profilePicture: 'https://via.placeholder.com/150',
    backgroundImage: 'https://via.placeholder.com/600x200',
  });

  const [savedPosts, setSavedPosts] = useState([]);

  // Memoized update functions to prevent unnecessary re-renders
  const updateProfile = useCallback((updatedProfile) => {
    setProfile(prev => ({
      ...prev,
      ...updatedProfile
    }));
  }, []);

  const savePost = useCallback((post) => {
    setSavedPosts(prev => [...prev, post]);
  }, []);

  const removePost = useCallback((postId) => {
    setSavedPosts(prev => prev.filter(post => post.id !== postId));
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    profile,
    setProfile: updateProfile,
    savedPosts,
    setSavedPosts,
    savePost,
    removePost
  }), [profile, savedPosts, updateProfile, savePost, removePost]);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook for using the profile context
export const useProfile = () => {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};