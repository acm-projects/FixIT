import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';  // Import useState to manage login state
import { router } from 'expo-router';
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome to FixIt</Text>

          {/* Custom Buttons for Onboarding (Log In, Sign Up) */}
          <CustomButton
            ContainerStyles={styles.customButton}
            name="Log in"
            handlePress={() => {
              router.push('/sign-in');   // Navigate to the home page after login
            }}
          />
          
          <CustomButton
            name="Sign Up"
            ContainerStyles={styles.customButton}
            handlePress={() => {
              router.push('/sign-up');   // Navigate to the home page after sign up
            }}
          />
          <CustomButton
            name="Home"
            ContainerStyles={styles.customButton}
            handlePress={() => {
              router.push('/home');   // Navigate to the home page after sign up
            }}
          />
        
          {/* Add more onboarding-related content here if needed */}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
  },
  scrollContainer: {
    height: '100%',
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,  // Adjust gap between buttons
    backgroundColor: '#f3e8ff',  // Background color
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  customButton: {
    marginVertical: 20,  // Adjust the vertical margin
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'solid',
  },
});
