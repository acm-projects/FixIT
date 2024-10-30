import {Input, Text} from "react-native"
import { TextInput, View } from "react-native"
import { useState } from "react";

function PostInput({title, description, valueProp, multi, onChange, textStyles, descriptionStyles, inputStyles}) {
  const [isFocused, setIsFocused] = useState(false);
  
  
  return(
    <View className="w-full flex-1">
        <Text className={`text-4xl ${textStyles}`}>{title}</Text>
        <Text className={`text-lg text-slate-500 pb-2 ${descriptionStyles}`}>{description}</Text>

        <TextInput
         className={`bg-white flex p-2 text-xl shadow-xl py-2 rounded-xl w-full 
          ${(isFocused | valueProp != "") ?"border-2 border-green" : "border border-gray-300"} ${inputStyles}`}
         value={valueProp}
         autoFocus={true}
         onFocus={() => setIsFocused(true)}
         onBlur={() => setIsFocused(false)}
         onChangeText={onChange}
         multiline={multi}
         >
        </TextInput>
    </View>
  )
}

export default PostInput
