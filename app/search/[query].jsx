import { StyleSheet, View, TextInput, Image } from 'react-native';
import React, { useState } from 'react';

const Query = () => {
  const [searchQuerry, setSearchQuerry] = useState('');

  return (
    <View style={styles.container}>
      <Image 
        source={icons.search}
        style={styles.icon}
      />

      <TextInput
        style={styles.input}
        value={searchQuerry}
        placeholder="Search"
        onChangeText={(text) => setSearchQuerry(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 60,  // Tailwind "w-15"
    height: 'auto',  // Tailwind "h-fit"
  },
  icon: {
    width: 40,  // Tailwind "w-10"
    height: 40,  // Tailwind "h-10"
    tintColor: '#64748b',  // Tailwind "text-slate-500"
  },
  input: {
    color: '#000000',  // Tailwind "text-black"
    width: '50%',  // Tailwind "w-3/6"
    height: '100%',  // Tailwind "h-full"
    backgroundColor: '#e2e8f0',  // Tailwind "bg-slate-200"
    borderWidth: 1,  // Tailwind "border-1"
    fontWeight: '600',  // Tailwind "font-psemibold"
    borderRadius: 8,  // Tailwind "rounded-lg"
    fontSize: 16,  // Tailwind "text-base"
  },
});

export default Query;
