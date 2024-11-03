import React, { useState } from 'react';
import { YStack, XStack, Input, Text, Pressable, Image } from 'tamagui';
import { icons } from "../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <YStack marginBottom={12} {...otherStyles}>
      <Text color="#FFFFFF" fontWeight="500" marginBottom={8}>
        {title}
      </Text>
      <XStack
        borderWidth={2}
        borderColor="#000"
        width="100%"
        height={64}
        paddingHorizontal={16}
        borderRadius={16}
        backgroundColor="#000000"
        alignItems="center"
        justifyContent="center"
      >
        <Input
          flex={1}
          color="#FFFFFF"
          fontWeight="600"
          fontSize={16}
          placeholder={placeholder}
          placeholderTextColor="#F3F4F6"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />
        {title === "Password" && (
          <Pressable onPressOut={() => setShowPassword((prev) => !prev)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} height={40} width={40} />
          </Pressable>
        )}
      </XStack>
    </YStack>
  );
};

export default FormField;
