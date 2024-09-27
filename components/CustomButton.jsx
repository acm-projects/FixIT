import { View, Text, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({textStyles, ContainerStyles, name, handlePress}) => {
  return (
    <Pressable className={`w-1/2 h-10 border-2 border-black bg-amber-500 rounded-lg ${ContainerStyles}`} onPressOut={handlePress}>
        <View className="flex justify-center items-center h-full">
            <Text className={`text-lg ${textStyles}`}>{name}</Text>
        </View>
    </Pressable>
  )
}

export default CustomButton