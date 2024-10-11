import { View, Text, TextInput, Pressable, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import {icons} from "../constants"

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, keyboardType}) => {

  const [showPassword, setShowPassword] = useState(false)


  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-white font-pmedium">{title}</Text>

      <View className={`${title==="Password" ? "flex flex-row items-center" : ""} border-2 w-full h-16 px-4 focus:border-purple-400 bg-black-100 rounded-2xl`}>
        <TextInput
        className="text-white flex-1 font-psemibold text-base"
        value={value}
        placeholder={placeholder}
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        >
        </TextInput>

        {title === "Password" && 
        <Pressable onPressOut={() => {setShowPassword((prev) => !prev)}}>
          <Image className="h-10 w-10" contained source={!showPassword ? icons.eye : icons.eyeHide}/>
        </Pressable>}
      </View>
    </View>

  )
}

export default FormField