import React from 'react';
import { View, TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledInput = styled(TextInput);

const ElevatedInput = ({ placeholder }) => {
  return (
    <View className="m-3 bg-white rounded-lg p-3 shadow-lg">
      <StyledInput
        placeholder={placeholder}
        className="text-base text-gray-800"
      />
    </View>
  );
};

export default ElevatedInput;
