import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MsgBubble from '../../components/msgBubble.jsx';
import TypeBox from '../../components/typeBox.jsx';
import tw from 'twrnc';

// WiFi-related responses database
const WIFI_RESPONSES = {
  default: "I'm here to help you with WiFi connectivity at UTD. What specific question do you have about connecting to the WiFi?",
  
  // Common WiFi-related keywords and their responses
  responses: [
    {
      keywords: ['connect', 'wifi', 'wireless', 'setup'],
      response: "To connect to UTD WiFi:\n\n1. Go to your device's WiFi settings\n2. Select 'UTD WiFi' from the list of available networks\n3. Enter your NetID and password when prompted\n4. Accept the security certificate if asked"
    },
    {
      keywords: ['password', 'credentials', 'login', 'netid'],
      response: "You'll need your UTD NetID and password to connect to the WiFi. If you've forgotten your password, you can reset it at netid.utdallas.edu"
    },
    {
      keywords: ['certificate', 'security', 'trust'],
      response: "When connecting for the first time, you may be prompted to accept a security certificate. This is normal and required for a secure connection. The certificate name should be from UTD."
    },
    {
      keywords: ['cant connect', "can't connect", 'trouble', 'issues', 'problem'],
      response: "If you're having trouble connecting:\n\n1. Ensure WiFi is enabled on your device\n2. Forget the network and try reconnecting\n3. Verify your NetID and password\n4. Make sure you're in range of a WiFi access point\n\nIf problems persist, contact the Help Desk at 972-883-2911"
    },
    {
      keywords: ['guest', 'visitor', 'temporary'],
      response: "For guest WiFi access:\n\n1. Select 'UTD Guest' network\n2. Open a web browser - you'll be redirected to the guest portal\n3. Follow the instructions to register for temporary access"
    },
    {
      keywords: ['help desk', 'support', 'assistance', 'contact'],
      response: "Need additional help? Contact the UTD Help Desk:\n\nPhone: 972-883-2911\nEmail: assist@utdallas.edu\nLocation: Student Services Building, SSB 2.200\n\nHours: Monday-Friday 8am-6pm"
    }
  ]
};

const Chat = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your FixIT assistant! How can I help you today?", 
      sender: false 
    }
  ]);

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const findResponse = (message) => {
    const lowercaseMsg = message.toLowerCase();
    
    // Find matching response based on keywords
    const matchingResponse = WIFI_RESPONSES.responses.find(response => 
      response.keywords.some(keyword => lowercaseMsg.includes(keyword))
    );

    return matchingResponse ? matchingResponse.response : WIFI_RESPONSES.default;
  };

  const handleSend = async (message) => {
    // Add user message
    const newUserMessage = { text: message, sender: true };
    setMessages(prev => [...prev, newUserMessage]);
    
    // Dismiss keyboard after sending
    Keyboard.dismiss();

    // Simulate brief delay for more natural conversation flow
    setTimeout(() => {
      const botResponse = findResponse(message);
      setMessages(prev => [...prev, { text: botResponse, sender: false }]);
    }, 1000);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#E4D3BA]`}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={tw`flex-1`}>
          <ScrollView
            ref={scrollViewRef}
            style={tw`flex-1`}
            contentContainerStyle={tw`pb-4 px-2.5`}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg, index) => (
              <MsgBubble
                key={index}
                message={msg.text}
                isSender={msg.sender}
                isError={msg.isError}
              />
            ))}
          </ScrollView>
          
          <View style={tw`bg-[#E4D3BA]`}>
            <TypeBox 
              onSend={handleSend} 
              placeholder="Ask about UTD WiFi..." 
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;