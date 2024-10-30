import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

// Correct component imports with the correct file names
import MsgBubble from '../../components/msgBubble.jsx';  // Notice the correct import name
import TypeBox from '../../components/typeBox.jsx';      // Notice the correct import name

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: false },
    { text: 'Hi there!', sender: true },
  ]);

  const handleSend = (message) => {
    setMessages([...messages, { text: message, sender: true }]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <MsgBubble key={index} message={msg.text} isSender={msg.sender} />
        ))}
      </ScrollView>
      <TypeBox onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#E4D3BA',  
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
});

export default Chat;
