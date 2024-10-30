import React, { useState } from 'react';
import { View, TextInput, Image, Animated, Pressable } from 'react-native';
import { icons } from '../constants'; 
import { SearchBar } from '@rneui/themed';

const ExpandingSearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Animated width for the search bar
  const animatedWidth = new Animated.Value(40); // Initial width to only show the icon

  const handlePress = () => {
    // Handle the expansion and focus state
    if (!isFocused) {
      setIsFocused(true);
      Animated.timing(animatedWidth, {
        toValue: 300, // Expanded width
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleBlur = () => {
    if (searchQuery === '') {
      setIsFocused(false);
      Animated.timing(animatedWidth, {
        toValue: 40, // Collapsed width
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View className="flex flex-row items-center">
      <Pressable onPress={handlePress}>
        <Image source={icons.search} className="w-8 h-8 mr-2" />
      </Pressable>
      <Animated.View style={{ width: animatedWidth }}>
        {isFocused && (
          <TextInput
            value={searchQuery}
            placeholder="Search"
            onBlur={handleBlur}
            onChangeText={setSearchQuery}
            className="h-10 border border-gray-300 rounded-md p-2 bg-gray-200"
            onFocus={handlePress} // Keep focused when typing
          />
        )}
      </Animated.View>
    </View>
  );
};

export default ExpandingSearchBar;
