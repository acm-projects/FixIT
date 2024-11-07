import { View, Text } from 'react-native'
import React from 'react'
import {useLocalSearchParams, useGlobalSearchParams} from 'expo-router'

const postDetail = () => {
  const params = useLocalSearchParams()
  const item = JSON.parse(params["data"])
  
 

  return (
    <View>
      <Text>{item["title"]}</Text>
    </View>
  )
}

export default postDetail