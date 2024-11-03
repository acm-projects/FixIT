import React from 'react';
import { TamaguiProvider, Text, Button, YStack, ScrollView } from 'tamagui';
import config from '../tamagui.config';

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <YStack height="100%" justifyContent="center" alignItems="center" space="$4" bg="#E4D3BA">
          <Text fontSize={24} fontWeight="bold" mb="$4" color="#23603F">
            Welcome to FixIt
          </Text>

          <Button  my="$4" borderWidth={2} borderColor="#B1A180" onPress={() => alert('Log in')}>
            Log in
          </Button>

          <Button  my="$4" borderWidth={2} borderColor="#B1A180" onPress={() => alert('Sign up')}>
            Sign Up
          </Button>

          <Button  my="$4" borderWidth={2} borderColor="#B1A180" onPress={() => alert('Home')}>
            Home
          </Button>
        </YStack>
      </ScrollView>
    </TamaguiProvider>
  );
}
