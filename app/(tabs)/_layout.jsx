import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Tabs, useNavigation } from 'expo-router';  // Use Tabs and navigation from expo-router
import { icons } from '../../constants';

function TabIcon({ color, name, focused, icon, imgStyle, viewStyle }) {
  return (
    <View style={styles.tabIconContainer(focused, viewStyle)}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={styles.tabIconImage(imgStyle)}
      />
      <Text style={styles.tabIconText(focused)}>
        {name}
      </Text>      
    </View>
  );
}

const TabsLayout = () => {
  const navigation = useNavigation();  // Initialize navigation hook

  return (
    <>
      {/* Custom Navigation Bar */}
      <View style={styles.navBar}>
        {/* Left side: Logo and app name */}
        <View style={styles.navLeft}>
          <Image source={icons.placeholder} style={styles.logo} />
          <Text style={styles.appName}>FixIT</Text>
        </View>

        {/* Right side: Search icon and Profile button */}
        <View style={styles.navRight}>
          <TouchableOpacity onPress={() => navigation.navigate('search')}>
            <Image source={icons.search} style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <Image source={icons.profile} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#B1A180',  // Set entire tab background color
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={focused ? '#23603F' : '#888'}
                name={"Home"}
                focused={focused}
                icon={icons.home} />
            )
          }} />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={focused ? '#23603F' : '#888'}
                name={"Chat"}
                focused={focused}
                icon={icons.chat} />
            )
          }} />
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
                imgStyle={'w-10 h-10'}
                viewStyle={'pt-5'} />
            )
          }} />
        <Tabs.Screen
          name="trending"
          options={{
            title: "Trending",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={focused ? '#23603F' : '#888'}
                name={"Trending"}
                focused={focused}
                icon={icons.trending} />
            )
          }} />
        <Tabs.Screen
          name="contact"
          options={{
            title: "Contact",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={focused ? '#23603F' : '#888'}
                name={"Contact"}
                focused={focused}
                icon={icons.phone} />
            )
          }} />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarButton: () => null,  // Hide this tab
          }} />
        <Tabs.Screen
          name="editProfile"
          options={{
            title: "Edit Profile",
            headerShown: false,
            tabBarButton: () => null,  // Hide this tab
          }} />
        <Tabs.Screen
          name="savePosts"
          options={{
            title: "Saved profile",
            headerShown: false,
            tabBarButton: () => null,  // Hide this tab
          }} />
          <Tabs.Screen
          name="ProfileContext"
          options={{
            title: "ProfileContext",
            headerShown: false,
            tabBarButton: () => null,  // Hide this tab
          }} />
        <Tabs.Screen
          name="search"  // Add search screen
          options={{
            title: "Search",
            headerShown: false,
            tabBarButton: () => null,  // Hide this tab
          }} />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  // Navbar styles
  navBar: {
    height: 60,
    backgroundColor: '#B1A180',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#23603F',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#23603F',
  },
  profileIcon: {
    width: 30,
    height: 30,
    tintColor: '#23603F',
  },
  // Tab styles
  tabIconContainer: (focused, viewStyle) => ({
    paddingTop: !focused ? 20 : 0,
    transform: [{ scale: !focused ? 0.9 : 1 }],
    alignItems: 'center',
    justifyContent: 'center',
  }),
  tabIconImage: (imgStyle) => ({
    width: imgStyle === 'w-10' ? 40 : 24,
    height: imgStyle === 'h-10' ? 40 : 24,
    tintColor: '#23603F',
  }),
  tabIconText: (focused) => ({
    fontFamily: focused ? 'psemibold' : 'pregular',
  }),
});
