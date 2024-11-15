import React from 'react';
import { View } from 'react-native';
import { Text, Card } from '@rneui/themed';
import tw from 'twrnc';

const MsgBubble = ({ message, isSender }) => {
  // Option 1: Using RNE Card
  return (
    <View
      style={[
        tw`p-2.5 rounded-lg my-1 max-w-[75%]`,
        isSender ? 
          tw`bg-[#23603F] self-end` : 
          tw`bg-[#672557] self-start`
      ]}
    >
      <Text style={tw`text-white`}>
        {message}
      </Text>
    </View>
  );
  
  
};

export default MsgBubble;