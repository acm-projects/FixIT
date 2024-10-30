import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MsgBubble = ({ message, isSender }) => {
  return (
    <View style={[styles.bubble, isSender ? styles.sender : styles.receiver]}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  sender: {
    backgroundColor: '#23603F',  // Sender bubble color (for example, a green color)
    alignSelf: 'flex-end',        // Align messages to the right
  },
  receiver: {
    backgroundColor: '#672557',  // Receiver bubble color
    alignSelf: 'flex-start',     // Align messages to the left
  },
  messageText: {
    color: '#fff',  // White text for better contrast
  },
});

export default MsgBubble;
