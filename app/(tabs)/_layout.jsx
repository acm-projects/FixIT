import React from 'react';
import { YStack, HStack, Text, Image, TouchableOpacity } from 'tamagui';
import { Tabs, useNavigation } from 'expo-router'; // Use Tabs and navigation from expo-router
import { icons } from '../../constants';

function TabIcon({ color, name, focused, icon, imgStyle, viewStyle }) {
  return (
    <YStack paddingTop={!focused ? 20 : 0} scale={!focused ? 0.9 : 1} alignItems="center" justifyContent="center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        width={imgStyle === 'w-10' ? 40 : 24}
        height={imgStyle === 'h-10' ? 40 : 24}
      />
      <Text fontFamily={focused ? 'psemibold' : 'pregular'}>
        {name}
      </Text>      
    </YStack>
  );
}

const TabsLayout = () => {
  const navigation = useNavigation(); // Initialize navigation hook

  return (
    <>
      {/* Custom Navigation Bar */}
      <HStack height={60} backgroundColor="#B1A180" justifyContent="space-between" alignItems="center" paddingHorizontal={10}>
        {/* Left side: Logo and app name */}
        <HStack alignItems="center">
          <Image source={icons.placeholder} width={40} height={40} marginRight={10} />
          <Text fontSize={20} fontWeight="bold" color="#23603F">FixIT</Text>
        </HStack>

        {/* Right side: Search icon and Profile button */}
        <HStack alignItems="center">
          <TouchableOpacity onPress={() => navigation.navigate('search')}>
            <Image source={icons.search} width={24} height={24} marginRight={15} tintColor="#23603F" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <Image source={icons.profile} width={30} height={30} tintColor="#23603F" />
          </TouchableOpacity>
        </HStack>
      </HStack>

      {/* Tab Navigation */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#B1A180', // Set entire tab background color
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={focused ? '#23603F' : '#888'} name="Home" focused={focused} icon={icons.home} />
            )
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={focused ? '#23603F' : '#888'} name="Chat" focused={focused} icon={icons.chat} />
            )
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: "Post",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={focused ? '#23603F' : '#888'} focused={focused} icon={icons.plus} imgStyle="w-10 h-10" />
            )
          }}
        />
        <Tabs.Screen
          name="trending"
          options={{
            title: "Trending",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={focused ? '#23603F' : '#888'} name="Trending" focused={focused} icon={icons.trending} />
            )
          }}
        />
        <Tabs.Screen
          name="contact"
          options={{
            title: "Contact",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={focused ? '#23603F' : '#888'} name="Contact" focused={focused} icon={icons.phone} />
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarButton: () => null, // Hide this tab
          }}
        />
        <Tabs.Screen
          name="editProfile"
          options={{
            title: "Edit Profile",
            headerShown: false,
            tabBarButton: () => null, // Hide this tab
          }}
        />
        <Tabs.Screen
          name="savePosts"
          options={{
            title: "Saved profile",
            headerShown: false,
            tabBarButton: () => null, // Hide this tab
          }}
        />
        <Tabs.Screen
          name="ProfileContext"
          options={{
            title: "ProfileContext",
            headerShown: false,
            tabBarButton: () => null, // Hide this tab
          }}
        />
        <Tabs.Screen
          name="search" // Add search screen
          options={{
            title: "Search",
            headerShown: false,
            tabBarButton: () => null, // Hide this tab
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
