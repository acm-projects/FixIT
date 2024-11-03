import React from 'react';
import { YStack, XStack, Pressable, Text, Image } from 'tamagui';

const ThirdPartyButton = ({ name, iconSource, ContainerStyles, textStyles, handlePress }) => {
  return (
    <Pressable
      onPressOut={handlePress}
      width="83.333%" // Equivalent to Tailwind w-5/6
      height={48}
      backgroundColor="#000000"
      borderRadius={24}
      justifyContent="center"
      alignItems="center"
      {...ContainerStyles} // Apply custom styles if provided
    >
      <XStack alignItems="center" justifyContent="center" paddingHorizontal={20} height="100%">
        <XStack alignItems="center" justifyContent="center" marginRight={12}>
          <Image source={iconSource} height={28} width={28} marginRight={8} />
          <Text fontSize={18} color="#FFFFFF" {...textStyles}>
            {name}
          </Text>
        </XStack>
      </XStack>
    </Pressable>
  );
};

export default ThirdPartyButton;
