import React, { useState } from 'react';
import { YStack, ScrollView } from 'tamagui';
import MsgBubble from '../../components/msgBubble.jsx';
import TypeBox from '../../components/typeBox.jsx';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: false },
    { text: 'Hi there!', sender: true },
  ]);

  // Function to send user message to the server and get the AI response
  const handleSend = async (message) => {
    // Add the user message to the chat
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: true }]);

    // Send the message to the backend (API call)
    try {
      const response = await fetch('http://localhost/api/users/chatWithBot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),  // Send user message
      });

      const data = await response.json();

      // Check for errors
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch bot response');
      }

      // Get the bot's reply
      const botReply = data.reply;

      // Add the bot's reply to the chat
      setMessages((prevMessages) => [...prevMessages, { text: botReply, sender: false }]);

    } catch (error) {
      console.log("Error getting bot response:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Oops! Something went wrong.", sender: false }]);
    }
  };

  return (
    <YStack flex={1} justifyContent="space-between" backgroundColor="$lightBeige">
      <ScrollView flex={1} padding="$2">
        {messages.map((msg, index) => (
          <MsgBubble key={index} message={msg.text} isSender={msg.sender} />
        ))}
      </ScrollView>
      <TypeBox onSend={handleSend} />
    </YStack>
  );
};

export default Chat;
