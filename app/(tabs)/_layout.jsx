import { View, Text, Image } from 'react-native'
import {Tabs, Redirect} from 'expo-router';
import {icons} from '../../constantsForFixit';
const TabIcon =({icon,color,name,focused}) => {
  return (
    <View className="items-center justify-center gap-2"> 
      <Image

        source={icon}
        resizeMode="contain"
        tintColor="purple"
        className="w-6 h-6"

      />
      <Text className={`${focused ? 'font-psemibold' :'font-pregular'} text-xs`}>
        {name}
      </Text>

    </View>
  )
}
const Tabslayout = () => {
  return (
    <>
      <Tabs screenOptions={{tabsBarShowLabel: false, tabBarActiveTintColor: '#FFA001', tabBarStyle:{
        backgroundColor: 'gray'
      }}}>
      <Tabs.Screen
            name="home"
            options={{
              title:"Home",
              headerShown:false, 
              tabBarIcon:({color, focused}) => (
                <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
                />
              )
            }}
          />
      <Tabs.Screen
            name="create"
            options={{
              title:"Create",
              headerShown:false,
              tabBarIcon:({color, focused}) => (
                <TabIcon
                icon={icons.upload}
                color={color}
                name="Home"
                focused={focused}
                />
              ) 
            }}
      />
      <Tabs.Screen
            name="community"
            options={{
              title:"Community",
              headerShown:false,
              tabBarIcon:({color, focused}) => (
                <TabIcon
                icon={icons.menu}
                color={color}
                name="Community"
                focused={focused}
                />
              ) 
            }}
          /> 
      <Tabs.Screen
            name="Chat"
            options={{
              title:"chat",
              headerShown:false, 
              tabBarIcon:({color, focused}) => (
                <TabIcon
                icon={icons.menu}
                color={color}
                name="chat"
                focused={focused}
                />
              )
            }}
          /> 
      </Tabs>
    </>
  )
}

export default Tabslayout