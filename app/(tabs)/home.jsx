import {  Text, View, StyleSheet, Image, ScrollView, Button} from 'react-native'
import React from 'react'
import {icons,images} from "../../constants"
import trending_today from "../../constants/trending_today.js"
import FeedOITComponent from '../../components/feedOITComponent.jsx'
{/* Home page going to take the posts from create page and render them on the home screen
    
  */}
const Home = () => {
  console.log(images.placeholderImage)
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Popular Topics</Text>
      
      <FeedOITComponent 
        title="How to setup VPN" 
        tags={['Wifi', 'VPN', 'Network']} 
        preview="Here is a quick overview of setting up a VPN..." 
        content="This is the full content of the post. It will contain step-by-step instructions on how to set up a VPN for your device..." 
        />

        <FeedOITComponent 
        title="Microsoft Teams" 
        tags={['Communication and Collaboration', 'Services', 'Microsoft 365 Applications']} 
        preview="Microsoft Teams is a powerful team-based ..." 
        content="Microsoft Teams is a powerful team-based collaboration tool that provides group chat, channeled conversations, instant messaging, live document collaboration, audio or video calls, and meetings (from one-on-ones to fully-featured audio/video conferences).
          Visit the KnowledgeBase to learn more about Microsoft Teams." 
        />
      <FeedOITComponent 
        title="Reset Password Troubleshooting" 
        tags={['NETID', 'password-reset', 'Network']} 
        preview="Here is a quick overview of setting up a VPN..." 
        content="This is the full content of the post. It will contain step-by-step instructions on how to set up a VPN for your device..." 
        />

        <FeedOITComponent 
        title="Ordering Transcripts" 
        tags={['NETID', 'password-reset', 'Network']} 
        preview="If you are an Alumnus, you will need to..." 
        content="If you are an Alumnus, you will need to reactivate your UTD ID to be able to log in to galaxy and officially request your transcripts. The reactivation form is submitted to gain temporary access to your UTD account.
        Navigate to the Registrar Office’s Official Transcripts page. Scroll down to open the Former Student Reactivation Request form. Fill in all the details as requested on the form as shown below. Click Submit." 
        />
      
      <FeedOITComponent 
        title="Install and Connect to GlobalProtect VPN" 
        tags={['VPN', 'GLobalProtect', 'Network']} 
        preview="The GlobalProtect Virtual Private Network (VPN) provides secure access to restricted..." 
        content="Open your preferred web browser.
Navigate to utdvpn.utdallas.edu and enter your UT Dallas credentials to sign in.
If you are not already authenticated through Duo, you will be asked to do so via a push notification, text message, or phone call.
Visit Knowledge Base - Duo for more information on how to enroll in Duo." 
        />          
        <FeedOITComponent 
        title="How to Enroll in Duo" 
        tags={['NETID', 'password-reset', 'Network']} 
        preview="f you have not previously enrolled in Duo, you should be automatically prompted to register when..." 
        content="If you have not previously enrolled in Duo, you should be automatically prompted to register when you try to access a Duo-protected application such as the Office 365 portal or Box. This article assists first time users in the Duo enrollment process. 

Instructions
In your web browser, open a webpage or resource protected by Duo such as the Office 365 portal or Box.
After you have opened a protected webpage, you will see the Duo prompt page.
Select an option you would like to use as your 2-factor device and choose Continue.
After selecting your authentication device, use your smartphone to scan the QR code or Phone number to receive a code to enroll.
Note: It is recommended to use Duo Mobile on your mobile phone. This would allow you to authenticate using multiple methods such as push notifications, SMS, and Phone Call as per your convenience.

If you selected Duo Mobile option, you must enter the mobile phone number of the device you would like to associate with Duo Mobile and follow the Duo Application instructions.
If you selected a Security Key option, you need to have a designated device to save the passkey and follow the Duo instructions.
If you selected Phone Number option, you must enter your phone number and follow the Duo Application instructions.
" 
        />

        <FeedOITComponent 
        title="IT Purchasing Guide" 
        tags={['NETID', 'password-reset', 'Network']} 
        preview="IT Purchasing guide is designed to streamline and simplify the process of purchasing software...." 
        content="IT Purchasing guide is designed to streamline and simplify the process of purchasing software. This ensures security, eliminates redundancy and creates a low-risk list of software that the campus can purchase. These lists will continue to expand.

To purchase software, please follow the eProcurement process in Orion.

All UT Dallas Information Systems should be updated with the latest compatible software patches. This includes patches for the operating system and third-party applications. High-priority patches may need to be installed outside of routine change control procedures at the request of the ISO in order to address critical security vulnerabilities." 
        />
        <FeedOITComponent 
        title="How to Find Your Mac Address (Android)" 
        tags={['NETID', 'password-reset', 'Network']} 
        preview="MAC addresses are a type of identifier that all computers..." 
        content="Many modern phones implement a mechanism known as MAC address randomization in which they send a random MAC address when they make a network request instead of the device's actual MAC address. The random MAC address is cycled periodically, which makes it harder for third-parties to track your device. It is generally a good idea to leave this setting enabled.

However, when troubleshooting network-related issues, it is beneficial to temporarily turn off MAC address randomization for the networks you're having trouble with so that the system administrators can identify your device in the network logs." 
        />


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#672557',  // Setting the background color to #672557
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    gap: 10,
  },
  title: {
    height: 40,
    width: 160,
    color: '#FFFFFF',  // Optional: Set the title color to white for better visibility
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Home
