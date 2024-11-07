import React from 'react';
import { View } from 'react-native';
import { Text, Card } from '@rneui/themed';
import tw from 'twrnc';

const MsgBubble = ({ message, isSender }) => {
  // Option 1: Using RNE Card
  return (
    <Card
      containerStyle={[
        tw`p-2.5 rounded-lg my-1 max-w-[75%]`,
        isSender ? 
          tw`bg-[#23603F] self-end` : 
          tw`bg-[#672557] self-start`
      ]}
      wrapperStyle={tw`p-0 m-0`}  // Remove default Card padding
    >
      <Text style={tw`text-white`}>
        {message}
      </Text>
    </Card>
  );
  
  // Option 2: Using simple View (more lightweight)
  /*
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
  */
};

export default MsgBubble;