import React, { useState } from 'react';
import { YStack, XStack, Input, Button, Text } from 'tamagui';

const TypeBox = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage(''); // Clear the text box after sending
    }
  };

  return (
    <XStack padding={10} alignItems="center" borderTopWidth={1} borderTopColor="#ccc" backgroundColor="#fff">
      <Input
        flex={1}
        borderWidth={1}
        borderColor="#ccc"
        borderRadius={20}
        paddingHorizontal={15}
        height={40}
        value={message}
        placeholder="Type a message..."
        onChangeText={setMessage}
      />
      <Button
        marginLeft={10}
        backgroundColor="#23603F"
        paddingHorizontal={20}
        paddingVertical={10}
        borderRadius={20}
        onPress={handleSend}
      >
        <Text color="#fff" fontWeight="bold">Send</Text>
      </Button>
    </XStack>
  );
};

export default TypeBox;
