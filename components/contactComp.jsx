import React from 'react';
import { YStack, XStack, Text, Pressable } from 'tamagui';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';

const ContactComp = ({ name, phone, email, link }) => {
  // Function to open phone dialer
  const handlePhonePress = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  // Function to open email client
  const handleEmailPress = () => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  // Function to open web link
  const handleLinkPress = () => {
    if (link) {
      Linking.openURL(link);
    }
  };

  return (
    <XStack justifyContent="space-between" alignItems="center" marginBottom={15}>
      {/* Name on the left side */}
      <Text fontSize={16} color="#23603F" fontWeight="bold" flex={1}>
        {name}
      </Text>

      {/* Buttons on the right side */}
      <XStack flexDirection="row">
        {/* Phone Button */}
        {phone && (
          <Pressable marginLeft={10} onPress={handlePhonePress}>
            <Icon name="call-outline" size={24} color="#23603F" />
          </Pressable>
        )}

        {/* Email Button */}
        {email && (
          <Pressable marginLeft={10} onPress={handleEmailPress}>
            <Icon name="mail-outline" size={24} color="#23603F" />
          </Pressable>
        )}

        {/* Web Link Button */}
        {link && (
          <Pressable marginLeft={10} onPress={handleLinkPress}>
            <Icon name="globe-outline" size={24} color="#23603F" />
          </Pressable>
        )}
      </XStack>
    </XStack>
  );
};

export default ContactComp;
