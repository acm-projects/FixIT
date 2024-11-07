import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';
import MsgBubble from '../../components/msgBubble.jsx';
import TypeBox from '../../components/typeBox.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: false },
    { text: 'Hi there!', sender: true },
  ]);

  // Ref for ScrollView to enable auto-scrolling
  const scrollViewRef = useRef();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Function to send user message to the server and get the AI response
  const handleSend = async (message) => {
    // Add the user message to the chat immediately
    const newUserMessage = { text: message, sender: true };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    try {
      const response = await fetch('http://localhost/api/users/chatWithBot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch bot response');
      }

      // Add the bot's reply
      setMessages(prevMessages => [
        ...prevMessages,
        { text: data.reply, sender: false }
      ]);

    } catch (error) {
      console.log("Error getting bot response:", error);
      
      // Add error message
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          text: "Oops! Something went wrong. Please try again.", 
          sender: false,
          isError: true 
        }
      ]);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Card containerStyle={tw`flex-1 bg-[#E4D3BA] p-0 m-0 border-0`}>
        <ScrollView
          ref={scrollViewRef}
          style={tw`flex-1 px-2.5`}
          contentContainerStyle={tw`pb-4`}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
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
        
        <View style={tw`px-2.5 pb-2.5 bg-[#E4D3BA]`}>
          <TypeBox 
            onSend={handleSend}
            placeholder="Type your message..."
          />
        </View>
      </Card>
    </SafeAreaView>
  );
};

export default Chat;