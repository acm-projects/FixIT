import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MsgBubble from '../../components/msgBubble.jsx';
import TypeBox from '../../components/typeBox.jsx';
import tw from 'twrnc';

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: false },
    { text: 'Hi there!', sender: true },
  ]);

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async (message) => {
    const newUserMessage = { text: message, sender: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

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

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.reply, sender: false },
      ]);
    } catch (error) {
      console.log('Error getting bot response:', error);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: 'Oops! Something went wrong. Please try again.',
          sender: false,
          isError: true,
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#E4D3BA]`}>
      <View style={tw`flex-1`}>
        <ScrollView
          ref={scrollViewRef}
          style={tw`flex-1`}
          contentContainerStyle={tw`pb-4 px-2.5`}
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
          <TypeBox onSend={handleSend} placeholder="Type your message..." />
        
      </View>
    </SafeAreaView>
  );
};

export default Chat;
