import { View, Text, Pressable,Image } from 'react-native'
import React from 'react'
import {icons} from "../constants"
import {useState} from "react"
import * as ImagePicker from 'expo-image-picker'

const AttachFile = () => {

  
  const [image, setImage] = useState("")

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowEditing: true,
      aspect: [4,3], 
      quality: 1,

    })

    console.log(result.assets[0].uri)

    if(!result.canceled){
      setImage(result.assets[0].uri)
    }

    
  }

  return (
    <>
    <Pressable 
    className="w-4/6 border-2 rounded-lg flex justify-center flex-row space-x-2 items-center border-slate-400"
    onPressOut={pickImage} 
    >
        <Image
        source={icons.upload}
        className="h-5 w-5 text-blue-600"
        />
        
        <Text className="text-xl">
            Upload Files
        </Text>
    </Pressable>

    
    <View className="flex justify-center items-center border-dashed h-1/6 w-4/6 border-2">
    {image && <Image source={{uri:image}} className="scale-50 h-full w-full"></Image>}
    </View>
    </>
  )
}

export default AttachFile