import { View, Text, Touc, Pressable, Image } from 'react-native'
import React from 'react'
import {icons} from "../constants"


const ThirdPartyButton = ({name, iconSource, ContainerStyles, textStyles, handlePress}) => {
    return (
    <Pressable className={`w-5/6 h-15 bg-black h-12 rounded-3xl text-white ${ContainerStyles}`} onPressOut={handlePress}>
        <View className="flex flex-row space-x-4 px-5 justify-center items-center h-full ">
            
            <View className="flex-row space-x-3 flex items-center">
            <Image
                source={iconSource}
                className="h-7 w-7"
            ></Image>
                <Text className={`text-xl ${textStyles}`}>{name}</Text>
            </View>
        </View>
    </Pressable>
  )
}

export default ThirdPartyButton