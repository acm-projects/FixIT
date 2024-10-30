import React, { useState } from 'react'
import { Text, Pressable, View } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

const ThreeDButton = ({ title, onPress }) => {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      className={`w-48 h-20 mb-16 shadow-md shadow-black rounded-lg bottom-1 left-1${isPressed ? 'top-0.5 left-0.5' : 'top-0 left-0'}`}
    > 
      {/* Shadow Layer */}
      <View className="absolute inset-0 bg-gray-600 rounded-lg top-1 left-1" />
      
      {/* Gradient Button Layer */}
      <LinearGradient
        colors={isPressed ? ['#D2BE92', '#672557'] : ['#E4D3BA', '#797ee1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`flex-1 justify-center items-center rounded-lg ${isPressed ? 'top-0.5 left-0.5' : 'top-0 left-0'}`}
      >
        <Text className="text-#a9a9ed font-bold text-2xl">{title}</Text>
      </LinearGradient>
    </Pressable>
  )
}

export default ThreeDButton
