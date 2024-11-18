import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Text } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { ProfileContext } from '../ProfileContext';
import { icons, images } from "../../constants";
import FeedOITComponent from '../../components/FeedOITComponent.jsx';
import tw from 'twrnc';

const Home = () => {


  // Feed data array to make the code more maintainable
  const feedData = [
    {
      title: "How to setup VPN",
      tags: ['Wifi', 'VPN', 'Network'],
      preview: "Here is a quick overview of setting up a VPN...",
      content: "This is the full content of the post. It will contain step-by-step instructions on how to set up a VPN for your device..."
    },
    {
      title: "Microsoft Teams",
      tags: ['Communication and Collaboration', 'Services', 'Microsoft 365 Applications'],
      preview: "Microsoft Teams is a powerful team-based ...",
      content: "Microsoft Teams is a powerful team-based collaboration tool that provides group chat, channeled conversations, instant messaging, live document collaboration, audio or video calls, and meetings (from one-on-ones to fully-featured audio/video conferences). Visit the KnowledgeBase to learn more about Microsoft Teams."
    },
    {
      title: "Reset Password Troubleshooting",
      tags: ['NETID', 'password-reset', 'Network'],
      preview: "Here is a quick overview of setting up a VPN...",
      content: "This is the full content of the post. It will contain step-by-step instructions on how to set up a VPN for your device..."
    },
    {
      title: "Ordering Transcripts",
      tags: ['NETID', 'password-reset', 'Network'],
      preview: "If you are an Alumnus, you will need to...",
      content: "If you are an Alumnus, you will need to reactivate your UTD ID to be able to log in to galaxy and officially request your transcripts. The reactivation form is submitted to gain temporary access to your UTD account. Navigate to the Registrar Office's Official Transcripts page. Scroll down to open the Former Student Reactivation Request form. Fill in all the details as requested on the form as shown below. Click Submit."
    },
    {
      title: "Install and Connect to GlobalProtect VPN",
      tags: ['VPN', 'GLobalProtect', 'Network'],
      preview: "The GlobalProtect Virtual Private Network (VPN) provides secure access to restricted...",
      content: "Open your preferred web browser. Navigate to utdvpn.utdallas.edu and enter your UT Dallas credentials to sign in. If you are not already authenticated through Duo, you will be asked to do so via a push notification, text message, or phone call. Visit Knowledge Base - Duo for more information on how to enroll in Duo."
    },
    {
      title: "How to Enroll in Duo",
      tags: ['NETID', 'password-reset', 'Network'],
      preview: "If you have not previously enrolled in Duo, you should be automatically prompted to register when...",
      content: "If you have not previously enrolled in Duo, you should be automatically prompted to register when you try to access a Duo-protected application such as the Office 365 portal or Box. This article assists first time users in the Duo enrollment process..."
    },
    {
      title: "IT Purchasing Guide",
      tags: ['NETID', 'password-reset', 'Network'],
      preview: "IT Purchasing guide is designed to streamline and simplify the process of purchasing software....",
      content: "IT Purchasing guide is designed to streamline and simplify the process of purchasing software. This ensures security, eliminates redundancy and creates a low-risk list of software that the campus can purchase..."
    },
    {
      title: "How to Find Your Mac Address (Android)",
      tags: ['NETID', 'password-reset', 'Network'],
      preview: "MAC addresses are a type of identifier that all computers...",
      content: "Many modern phones implement a mechanism known as MAC address randomization in which they send a random MAC address when they make a network request instead of the device's actual MAC address..."
    }
  ];

  return (
    <ScrollView 
      style={tw`flex-1 bg-[#672557]`}
      contentContainerStyle={tw`flex justify-center items-center pl-2.5 gap-2.5`}
    >
      <Text style={tw`h-12 text-white text-2xl font-bold text-center py-2 mb-4 w-100 bg-[#4A1B3D]`}>
  Popular Topics
</Text>
      
      {feedData.map((feed, index) => (
        <FeedOITComponent
          key={index}
          title={feed.title}
          tags={feed.tags}
          preview={feed.preview}
          content={feed.content}
        />
      ))}
    </ScrollView>
  );
};

export default Home;