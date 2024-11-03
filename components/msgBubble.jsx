import React from 'react';
import { YStack, Text } from 'tamagui';

const MsgBubble = ({ message, isSender }) => {
  return (
    <YStack
      padding={10}
      borderRadius={10}
      marginVertical={5}
      maxWidth="75%"
      backgroundColor={isSender ? '#23603F' : '#672557'}
      alignSelf={isSender ? 'flex-end' : 'flex-start'}
    >
      <Text color="#fff">{message}</Text>
    </YStack>
  );
};

export default MsgBubble;
