import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import PostInput from "../../components/PostInput"
import {useState} from 'react'
import {icons} from "../../constants"
import AttachFile from '../../components/AttachFile'

const Post = () => {
    const [isPressed, setIsPressed] = useState("")
    const [postData, setPostData] = useState({
      title: "",
      description:"", 
      details:"",
      solution:""
    }) 
    
    const handlePress = () => {
      setIsPressed((isPressed) => !isPressed)
    }

    const submitForm = () => {
      console.log()
    }
  return (

    <SafeAreaView className="h-full pb-0 mb-0">
      

      <View className="bg-slate-500 h-14 w-full"></View>

      <View className="flex items-center justify-center border-b-2">
        <Text className="pt-10 text-5xl ">Post an Issue</Text>
      </View>

      <ScrollView 
      contentContainerStyle={{flexDirection:"column", justifyContent:"center", alignItems:"center",gap:"70"}} 
      className="pb-20 px-2 pt-10"
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps='handled'>
        <PostInput
          title="Title"
          description={"Be specific and imagine you're asking a question to another person"}

          valueProp={postData.title}
          onChange={(e) => setPostData({...postData, title:e})}

          inputStyles={"h-3/6 mb-10"}
        />

        <PostInput
          title="What are the details?"
          description={"Introduce the problem and expand on what you put in the title. Minimum 20 characters."}

          valueProp={postData.description}
          onChange={(e) => setPostData({...postData, description:e})}

          inputStyles={"h-4/6 mb-20"}
          multi={true}
          
        />

        <PostInput
          title="What did you try?"
          

          valueProp={postData.solution}
          onChange={(e) => setPostData({...postData, solution:e})}

          inputStyles={"h-4/6 pb-10"}
          multi={true}
        />

        <AttachFile/>

        
        
        <PostInput
          title={"Tags"}
          description={"Add upto 5 tags to describe your issue."}

          inputStyles={"h-2/6 pb-10"}
        />

        

        <Pressable 
          className={`rounded-lg h-fit mb-20 duration-100 p-5 bg-slate-200 ${isPressed ? "bg-slate-400": "bg-inherit"}`}
          onPressIn={handlePress}
          onPressOut={handlePress}
          onPress={submitForm}
          >
          <Text className="text-2xl">PRESS ME TO SUBMIT</Text>
        </Pressable>

      </ScrollView>

      
      
        

    {/* View for all the input */}

  
      
    


    </SafeAreaView>
  )
}

export default Post

const styles = StyleSheet.create({})