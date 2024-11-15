import React from 'react';
import { View, Linking } from 'react-native';
import { Text, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

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
    <View style={tw`flex-row justify-between items-center mb-4`}>
      {/* Name on the left side */}
      <Text style={tw`text-base text-[#23603F] font-bold flex-1`}>
        {name}
      </Text>

      {/* Buttons on the right side */}
      <View style={tw`flex-row`}>
        {/* Phone Button */}
        {phone && (
          <Button
            type="clear"
            onPress={handlePhonePress}
            icon={<Icon name="call-outline" size={24} color="#23603F" />}
            containerStyle={tw`ml-2.5`}
            buttonStyle={tw`p-0`}
          />
        )}

        {/* Email Button */}
        {email && (
          <Button
            type="clear"
            onPress={handleEmailPress}
            icon={<Icon name="mail-outline" size={24} color="#23603F" />}
            containerStyle={tw`ml-2.5`}
            buttonStyle={tw`p-0`}
          />
        )}

        {/* Web Link Button */}
        {link && (
          <Button
            type="clear"
            onPress={handleLinkPress}
            icon={<Icon name="globe-outline" size={24} color="#23603F" />}
            containerStyle={tw`ml-2.5`}
            buttonStyle={tw`p-0`}
          />
        )}
      </View>
    </View>
  );
};

export default ContactComp;