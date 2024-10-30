import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const PostInput = ({ title, description, valueProp, onChange, inputStyles, multi = false }) => {
  return (
    <View style={[styles.container, inputStyles]}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <TextInput
        style={[styles.input, multi && styles.multiLineInput]}
        value={valueProp}
        onChangeText={onChange}
        placeholder={description}  // You can change placeholder text if needed
        placeholderTextColor="#6B7280"  // Optional: Gray placeholder color
        multiline={multi}
      />
    </View>
  );
};

export default PostInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,  // Space between inputs
  },
  title: {
    fontSize: 18,  // Tailwind "text-xl"
    fontWeight: '600',  // Tailwind "font-semibold"
    marginBottom: 5,  // Space between title and input
  },
  description: {
    fontSize: 14,  // Tailwind "text-sm"
    color: '#6B7280',  // Tailwind "text-gray-500"
    marginBottom: 10,  // Space between description and input
  },
  input: {
    width: '100%',
    height: 40,  // Default height for single-line input
    borderColor: '#E5E7EB',  // Tailwind "border-gray-300"
    borderWidth: 1,
    borderRadius: 10,  // Tailwind "rounded-lg"
    paddingHorizontal: 12,  // Tailwind "px-4"
    backgroundColor: '#FFFFFF',  // Tailwind "bg-white"
    color: '#111827',  // Tailwind "text-gray-900"
  },
  multiLineInput: {
    height: 120,  // Adjusted height for multi-line inputs (like "What are the details?" or "What did you try?")
    textAlignVertical: 'top',  // Ensures the text starts at the top for multi-line input
  },
});
