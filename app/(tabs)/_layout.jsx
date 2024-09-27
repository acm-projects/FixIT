import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs, Redirect} from 'expo-router'

import {icons} from '../../constants';

function TabIcon({color, name, focused, icon, imgStyle, viewStyle}){
  return (
    <View className={`transition ease-in-out ${!focused ? 'pt-5 scale-90' : 'pt-0'} ${viewStyle===undefined ? '' : viewStyle} duration-10000 items-center justify-center`}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`w-6 h-6 ${imgStyle===undefined ? '': imgStyle}`}
        />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'}`}>
        {name}
        </Text>      
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
      screenOptions={{
        tabBarShowLabel:false
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title:"Home",
            headerShown:false, 
            tabBarIcon: ({color,focused}) => (
              <TabIcon
              color={color}
              name={"Home"}
              focused={focused}
              icon={icons.home}
              />
            )
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title:"Chat",
            headerShown:false, 
            tabBarIcon: ({color,focused}) => (
              <TabIcon
              color={color}
              name={"Chat"}
              focused={focused}
              icon={icons.chat}
              />
            )
          }}
        />
        <Tabs.Screen
        name="post"
        options={{
          title:"Post",
          headerShown:false, 
          tabBarIcon: ({color,focused}) => (
            <TabIcon
            color={color}
            focused={focused}
            icon={icons.plus}
            imgStyle={'w-10 h-10'}
            viewStyle={'pt-5'}
            />
          )
        }}
      />
      <Tabs.Screen
      name="trending"
      options={{
        title:"Trending",
        headerShown:false, 
        tabBarIcon: ({color,focused}) => (
          <TabIcon
          color={color}
          name={"Trending"}
          focused={focused}
          icon={icons.trending}
          />
        )
      }}
    />
    <Tabs.Screen
      name="contact"
      options={{
        title:"Contact",
        headerShown:false, 
        tabBarIcon: ({color,focused}) => (
          <TabIcon
          color={color}
          name={"Contact"}
          focused={focused}
          icon={icons.phone}
          />
        )
      }}
    />
      </Tabs>
    </>
  )
}

export default TabsLayout