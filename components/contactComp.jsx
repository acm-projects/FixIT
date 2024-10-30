import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <View style={styles.container}>
      {/* Name on the left side */}
      <Text style={styles.name}>{name}</Text>

      {/* Buttons on the right side */}
      <View style={styles.buttonsContainer}>
        {/* Phone Button */}
        {phone && (
          <TouchableOpacity style={styles.button} onPress={handlePhonePress}>
            <Icon name="call-outline" size={24} color="#23603F" />
          </TouchableOpacity>
        )}

        {/* Email Button */}
        {email && (
          <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
            <Icon name="mail-outline" size={24} color="#23603F" />
          </TouchableOpacity>
        )}

        {/* Web Link Button */}
        {link && (
          <TouchableOpacity style={styles.button} onPress={handleLinkPress}>
            <Icon name="globe-outline" size={24} color="#23603F" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ContactComp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 16,
    color: '#23603F',
    fontWeight: 'bold',
    flex: 1,  // To make sure it takes up the left side
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,  // Adds space between the buttons
  },
});
