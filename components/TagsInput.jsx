import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const TypeBox = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <View style={tw`flex-row items-center p-2 border-t  bg-[#E4D3BA]`}>
      <Ionicons
        name="mic-outline"
        size={24}
        color="#23603F"
        style={tw`mr-2`}
        onPress={() => console.log('Microphone pressed')}
      />

      <Input
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        containerStyle={tw`flex-1 m-0 p-0`}
        inputContainerStyle={tw`border border-gray-300 rounded-full px-4 h-10 bg-white m-0`}
        inputStyle={tw`text-base m-0 p-0`}
        leftIconContainerStyle={tw`mr-2`}
        rightIcon={
          message.trim() ? (
            <Ionicons
              name="send"
              size={24}
              color="#23603F"
              onPress={handleSend}
            />
          ) : null
        }
        onSubmitEditing={handleSend}
      />

      {!message.trim() && (
        <Button
          onPress={handleSend}
          containerStyle={tw`ml-2`}
          buttonStyle={tw`bg-[#23603F] px-5 py-2.5 rounded-full`}
          titleStyle={tw`font-bold text-white`}
          title="Send"
          disabled={!message.trim()}
        />
      )}
    </View>
  );
};

export default TypeBox;
