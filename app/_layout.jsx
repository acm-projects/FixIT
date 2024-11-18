import React, { useEffect } from 'react';
import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { Stack, SplashScreen } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileProvider from './ProfileContext'; // Correct Import
import { PostsProvider } from './PostContext';
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file');
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProfileProvider>
        <PostsProvider>
        <ClerkProvider publishableKey={publishableKey}>
        <Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="index" />
  <Stack.Screen name="auth" />
  <Stack.Screen name="tabs" />
  <Stack.Screen name="postDetail" />
  <Stack.Screen name="profile" options={{ presentation: 'modal' }} />
  <Stack.Screen name="editProfile" options={{ presentation: 'modal' }} />
</Stack>

        </ClerkProvider>
       </ PostsProvider>
      </ProfileProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
