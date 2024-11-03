import React from 'react';
import { YStack, Pressable, Text } from 'tamagui';

const CustomButton = ({ textStyles, ContainerStyles, name, handlePress }) => {
  return (
    <Pressable
      width="50%" 
      height={40}
      borderWidth={2}
      borderColor="black"
      backgroundColor="#f59e0b" // Equivalent to Tailwind's "bg-amber-500"
      borderRadius={10}
      onPressOut={handlePress}
      {...ContainerStyles} // Apply custom container styles if provided
    >
      <YStack justifyContent="center" alignItems="center" height="100%">
        <Text fontSize={18} {...textStyles}>
          {name}
        </Text>
      </YStack>
    </Pressable>
  );
};

export default CustomButton;
