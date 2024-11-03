import { Text } from 'tamagui';
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          tabBarShowLabel: false
        }}
      >
        <Stack.Screen
          name="sign-in"
          options={{
            title: "sign-in",
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="sign-up"
          options={{
            title: "sign-up",
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
