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


  const deleteImage = () => {
    setImage("")
  }

  return (
    
      <View className="flex rounded-xl justify-center items-center border-dashed h-full w-1/2 border-2">
        {!image ? <Pressable className="h-5 w-5" onPressOut={pickImage}>
            <Image
            className="h-7 w-7"
            source={icons.plus}/>
        </Pressable>: 
        <>
          <Image source={{ uri: image }} className="h-full w-full rounded-xl" />
            <Pressable onPressOut={deleteImage} className="absolute top-2 opacity-80 right-2 bg-gray-600  rounded-full">
              <Image
                source={icons.cancel}
                className="w-6 h-6"
                style={{ tintColor: 'white' }}
              />
            </Pressable>
        </>}
        
        </View>
  )
}

export default AttachFile