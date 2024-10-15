import {Input, Text} from "react-native"
import { TextInput, View } from "react-native"

function PostInput({title, description, valueProp, multi, onChange, textStyles, descriptionStyles, inputStyles}) {
  return(
    <View className="w-full flex-1">
        <Text className={`text-4xl ${textStyles}`}>{title}</Text>
        <Text className={`text-lg text-slate-500 pb-2 ${descriptionStyles}`}>{description}</Text>

        <TextInput
         className={`bg-slate-400 px-3 py-2 rounded-lg w-full ${inputStyles}`}
         value={valueProp}
         onChangeText={onChange}
         multiline={multi}
         >
        </TextInput>
    </View>
  )
}

export default PostInput
