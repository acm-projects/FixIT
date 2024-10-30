// app/savedPosts.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavedPostsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Saved Posts Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4D3BA',
  },
  text: {
    fontSize: 24,
    color: '#23603F',
  },
});

export default SavedPostsPage;
