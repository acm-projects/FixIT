import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import PostInput from "../../components/PostInput"
import {useState} from 'react'
import {icons} from "../../constants"
import AttachFile from '../../components/AttachFile'
import TagsInput from '../../components/TagsInput'
import ThreeDButton from '../../components/ThreeDButton'
import RippleButton from '../../components/RippleButton'
import ExpandingSearchBar from '../../components/ExpandingSearchBar'

const post = () => {
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

    const submitForm = async () => {

      try {
        const response = await fetch('https://13f7-24-32-7-71.ngrok-free.app/api/posts/Ffc', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: postData.title,
            authorFirstName: "Ugonna",
            authorLastName: "Anyalemechi",
            content: postData.description,
            comments: [],
          }),
        });
        const json = await response.json();
        console.log(json)
      } catch (error) {
        console.error(error);
      }
    }

  return (

    // <SafeAreaView className="h-full pb-0 mb-0">
      

      
    <>
      <View className="flex bg-secondary-200 rounded-b-3xl pt-24 pb-2 pl-4 items-start justify-center">
        <Text className="text-5xl ">Post an Issue</Text>
        <Text className="text-xl ">Facing an Issue? Let others know. </Text>
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

          inputStyles={"h-4/6 mb-10 pb-10"}
          multi={true}
        />

     
        <View className="flex flex-col justify-center p-0 m-0 items-start h-1/4 w-full">
        <Text className="text-4xl mb-3">Upload Images</Text>
          <View className="flex flex-row justify-start items-center space-x-14 w-full h-5/6">
            <AttachFile/>
            <AttachFile/>
          </View>
        </View>
        
        
        <View className="w-full flex justify-center items-center">
        <TagsInput/>
        </View>



        <RippleButton title="Submit" onPress={submitForm}></RippleButton>
        {/* <ThreeDButton title="Submit"></ThreeDButton> */}
        {/* <Pressable 
          className={`rounded-lg h-fit mb-20 duration-100 p-5 bg-slate-200 ${isPressed ? "bg-secondary": "bg-secondary-200"}`}
          onPressIn={handlePress}
          onPressOut={handlePress}
          onPress={submitForm}
          >
          <Text className="text-2xl">PRESS ME TO SUBMIT</Text>
        </Pressable> */}

      </ScrollView>
    </>
  )
}

export default post

const styles = StyleSheet.create({})