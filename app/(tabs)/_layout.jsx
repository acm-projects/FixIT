import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs, useRouter } from 'expo-router';
import { icons } from '../../constants';
import tw from 'twrnc';

function TabIcon({ color, name, focused, icon, imgStyle, viewStyle }) {
  return (
    <View style={[
      tw`items-center justify-center`,
      focused ? tw`pt-0` : tw`pt-5`,
      focused ? tw`scale-100` : tw`scale-90`,
    ]}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={[
          tw`${imgStyle === 'w-10' ? 'w-10 h-10' : 'w-6 h-6'}`,
          { tintColor: '#23603F' }
        ]}
      />
      <Text style={tw`font-${focused ? 'semibold' : 'normal'}`}>
        {name}
      </Text>      
    </View>
  );
}

const TabsLayout = () => {
  const router = useRouter();

  return (
    <>
      <SafeAreaView>
        {/* Custom Navigation Bar */}
        <View style={tw`h-15 bg-[#B1A180] flex-row justify-between items-center px-2.5`}>
          {/* Left side: Logo and app name */}
          <View style={tw`flex-row items-center`}>
            <Image 
              source={icons.placeholder} 
              style={tw`w-10 h-10 mr-2.5`}
            />
            <Text style={tw`text-xl font-bold text-[#23603F]`}>
              FixIT
            </Text>
          </View>

          {/* Right side: Search icon and Profile button */}
          <View style={tw`flex-row items-center`}>
            <Button
              type="clear"
              onPress={() => router.push('/search')}
              icon={
                <Image 
                  source={icons.search} 
                  style={[tw`w-6 h-6 mr-4`, { tintColor: '#23603F' }]}
                />
              }
            />
            <Button
              type="clear"
              onPress={() => router.push('/profile')}
              icon={
                <Image 
                  source={icons.profile} 
                  style={[tw`w-7.5 h-7.5`, { tintColor: '#23603F' }]}
                />
              }
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Tab Navigation */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: tw`bg-[#B1A180]`,
        }}>
        {/* Home Tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={focused ? '#23603F' : '#888'}
                name="Home"
                focused={focused}
                icon={icons.home}
              />
            )
          }}
        />

        {/* Chat Tab */}
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={focused ? '#23603F' : '#888'}
                name="Chat"
                focused={focused}
                icon={icons.chat}
              />
            )
          }}
        />

        {/* Post Tab */}
        <Tabs.Screen
          name="post"
          options={{
            title: "Post",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={focused ? '#23603F' : '#888'}
                focused={focused}
                icon={icons.plus}
                imgStyle="w-10 h-10"
                viewStyle="pt-5"
              />
            )
          }}
        />

        {/* Trending Tab */}
        <Tabs.Screen
          name="trending"
          options={{
            title: "Trending",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={focused ? '#23603F' : '#888'}
                name="Trending"
                focused={focused}
                icon={icons.trending}
              />
            )
          }}
        />

        {/* Contact Tab */}
        <Tabs.Screen
          name="contact"
          options={{
            title: "Contact",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={focused ? '#23603F' : '#888'}
                name="Contact"
                focused={focused}
                icon={icons.phone}
              />
            )
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;