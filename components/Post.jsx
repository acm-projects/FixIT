import { View, Text,Image } from 'react-native'
import React from 'react'

const Post = ({title, details, solution, image, tags }) => {
  return (
    <View className="flex flex-col justify-start border-2 border-slate-300 rounded-lg p-2 items-start">
      <Text className="text-2xl font-semibold">{title}</Text>
      
      <View className="flex w-full">
        <Image
        source={image}
        className="h-6/6 w-full"></Image>
      </View>
    </View>
  )
}

export default Post