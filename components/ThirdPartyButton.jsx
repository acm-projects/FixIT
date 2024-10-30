import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';

const ThirdPartyButton = ({ name, iconSource, ContainerStyles, textStyles, handlePress }) => {
  return (
    <Pressable
      style={[styles.pressable, ContainerStyles]}  // Combine base styles and custom styles
      onPressOut={handlePress}
    >
      <View style={styles.buttonContent}>
        <View style={styles.iconContainer}>
          <Image
            source={iconSource}
            style={styles.icon}
          />
          <Text style={[styles.text, textStyles]}>{name}</Text>  {/* Combine base text style and custom styles */}
        </View>
      </View>
    </Pressable>
  );
}

export default ThirdPartyButton;

const styles = StyleSheet.create({
  pressable: {
    width: '83.333%',  // Tailwind "w-5/6"
    height: 48,  // Tailwind "h-12"
    backgroundColor: '#000000',  // Tailwind "bg-black"
    borderRadius: 24,  // Tailwind "rounded-3xl"
    justifyContent: 'center',  // Align items in the center
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',  // Tailwind "flex flex-row"
    alignItems: 'center',  // Tailwind "items-center"
    justifyContent: 'center',  // Tailwind "justify-center"
    paddingHorizontal: 20,  // Tailwind "px-5"
    height: '100%',  // Tailwind "h-full"
  },
  iconContainer: {
    flexDirection: 'row',  // Tailwind "flex-row"
    alignItems: 'center',  // Tailwind "flex items-center"
    justifyContent: 'center',
    marginRight: 12,  // Tailwind "space-x-3"
  },
  icon: {
    height: 28,  // Tailwind "h-7"
    width: 28,  // Tailwind "w-7"
    marginRight: 8,  // Tailwind "space-x-4" -> margin between icon and text
  },
  text: {
    fontSize: 18,  // Tailwind "text-xl"
    color: '#FFFFFF',  // Tailwind "text-white"
  },
});
