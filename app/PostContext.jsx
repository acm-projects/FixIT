import React, { createContext, useContext, useState } from 'react';
import { icons } from '../constants'; // Adjust path as needed

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
        id: '1',
        title: "How do I connect to UTD WiFi on my phone?",
        username: "NetStudent22",
        description: "I'm having trouble connecting to 'UTD WiFi' on my Android phone. Every time I try to connect, it keeps asking for authentication. I've tried my NetID and password but it's not working. Any help would be appreciated!",
        profileImage: icons.profile1,
        votes: 15,
        comments: 2,
      },
      {
        id: '2',
        title: "eLearning down for maintenance?",
        username: "TechComet",
        description: "Is eLearning supposed to be down right now? I'm trying to submit an assignment due tonight but can't access the platform. Getting a maintenance message.",
        profileImage: icons.profile2,
        votes: 32,
        comments: 2,
      },
      {
        id: '3',
        title: "Password reset not working",
        username: "TechComet",
        description: "I've been trying to reset my password through the NetID management portal but I'm not receiving the reset email. I've checked my spam folder too. What should I do?",
        profileImage: icons.profile2,
        votes: 8,
        comments: 2,
      },
      {
        id: '4',
        title: "Microsoft Office installation issue",
        username: "OfficeNinja",
        description: "When trying to install Microsoft Office through the UTD software center, I keep getting an error code 30125-1711. Has anyone else encountered this issue?",
        profileImage: icons.profile1,
        votes: 5,
        comments: 3,
      },
      {
        id: '5',
        title: "Zoom recording not showing up",
        username: "ZoomStudent",
        description: "My professor said they recorded today's lecture but I can't find it in eLearning. Usually recordings show up within an hour, but it's been 3 hours now. Is there a delay in processing?",
        profileImage: icons.profile2,
        votes: 12,
        comments: 7,
      },
      {
        id: '6',
        title: "VPN connection drops frequently",
        username: "RemoteScholar",
        description: "I'm trying to access library resources from home using the UTD VPN, but the connection keeps dropping every 10-15 minutes. Anyone else experiencing this?",
        profileImage: icons.profile1,
        votes: 18,
        comments: 9,
      },
      {
        id: '7',
        title: "Multi-factor authentication not accepting code",
        username: "SecurityPro",
        description: "The 2FA system isn't accepting my codes from the Microsoft Authenticator app. I've tried multiple times and made sure the time on my phone is correct.",
        profileImage: icons.profile2,
        votes: 25,
        comments: 11,
      },
      {
        id: '8',
        title: "Cannot access Galaxy email",
        username: "EmailExplorer",
        description: "Getting a 'Your account has been temporarily locked' message when trying to log into my Galaxy email. I haven't changed anything recently.",
        profileImage: icons.profile3,
        votes: 20,
        comments: 15,
      },
      {
        id: '9',
        title: "Printing balance shows zero",
        username: "PrintMaster",
        description: "My printing balance suddenly shows $0.00 even though I just added money yesterday. The transaction shows in my history but the balance isn't updated.",
        profileImage: icons.profile4,
        votes: 10,
        comments: 5,
      },
      {
        id: '10',
        title: "Computer lab software request",
        username: "LabRat23",
        description: "Does anyone know if we can request specific software to be installed in the computer labs? I need access to AutoCAD for a project but can't find it on any lab computers.",
        profileImage: icons.profile5,
        votes: 7,
        comments: 4,
      }
  ]);

  const addPost = (newPost) => {
    const post = {
      id: (posts.length + 1).toString(),
      votes: 0,
      comments: 0,
      profileImage: icons.profile1, // You can randomize this or use user's profile
      ...newPost
    };
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  return (
    <PostsContext.Provider value={{ posts, setPosts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);