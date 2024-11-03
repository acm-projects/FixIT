import React from 'react';
import { YStack, Input, Text } from 'tamagui';

const PostInput = ({ title, description, valueProp, onChange, inputStyles, multi = false }) => {
  return (
    <YStack width="100%" marginBottom={20} {...inputStyles}>
      <Text fontSize={18} fontWeight="600" marginBottom={5}>
        {title}
      </Text>
      {description && (
        <Text fontSize={14} color="#6B7280" marginBottom={10}>
          {description}
        </Text>
      )}
      <Input
        width="100%"
        height={multi ? 120 : 40}
        borderColor="#E5E7EB"
        borderWidth={1}
        borderRadius={10}
        paddingHorizontal={12}
        backgroundColor="#FFFFFF"
        color="#111827"
        placeholder={description}
        placeholderTextColor="#6B7280"
        multiline={multi}
        textAlignVertical={multi ? 'top' : 'center'}
        value={valueProp}
        onChangeText={onChange}
      />
    </YStack>
  );
};

export default PostInput;
