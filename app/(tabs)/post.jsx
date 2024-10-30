import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostInput from "../../components/postInput"
import { useState } from 'react'
import { icons } from "../../constants"


const Post = () => {
  const [isPressed, setIsPressed] = useState("")
  const [postData, setPostData] = useState({
    title: "",
    description: "", 
    details: "",
    solution: ""
  }) 
  
  const handlePress = () => {
    setIsPressed((isPressed) => !isPressed)
  }

  const submitForm = () => {
    console.log(postData)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Post an Issue</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps='handled'
      >
        <PostInput
          title="Title"
          description={"Be specific and imagine you're asking a question to another person"}
          valueProp={postData.title}
          onChange={(e) => setPostData({...postData, title: e})}
          inputStyles={styles.inputSpacing}
        />

        <PostInput
          title="What are the details?"
          description={"Introduce the problem and expand on what you put in the title. Minimum 20 characters."}
          valueProp={postData.description}
          onChange={(e) => setPostData({...postData, description: e})}
          inputStyles={styles.longInputSpacing}
          multi={true}
        />

        <PostInput
          title="What did you try?"
          valueProp={postData.solution}
          onChange={(e) => setPostData({...postData, solution: e})}
          inputStyles={styles.longInputSpacing}
          multi={true}
        />

        

        <PostInput
          title={"Tags"}
          description={"Add up to 5 tags to describe your issue."}
          inputStyles={styles.shortInputSpacing}
        />

        <Pressable
          style={[
            styles.pressableButton,
            isPressed ? styles.pressableButtonPressed : styles.pressableButtonDefault
          ]}
          onPressIn={handlePress}
          onPressOut={handlePress}
          onPress={submitForm}
        >
          <Text style={styles.pressableText}>PRESS ME TO SUBMIT</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Post

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 0,  // Tailwind "pb-0"
    marginBottom: 0,   // Tailwind "mb-0"
  },
  header: {
    backgroundColor: '#64748b',  // Tailwind "bg-slate-500"
    height: 56,  // Tailwind "h-14"
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,  // Tailwind "border-b-2"
  },
  titleText: {
    paddingTop: 40,  // Tailwind "pt-10"
    fontSize: 40,    // Tailwind "text-5xl"
  },
  scrollContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 70,  // Tailwind "gap-70" equivalent
    paddingBottom: 80,  // Adding some padding for scroll spacing (pb-20 equivalent)
    paddingHorizontal: 8,  // Tailwind "px-2"
    paddingTop: 40,  // Tailwind "pt-10"
  },
  inputSpacing: {
    height: '50%',  // Tailwind "h-3/6"
    marginBottom: 40,  // Tailwind "mb-10"
  },
  longInputSpacing: {
    height: '66%',  // Tailwind "h-4/6"
    marginBottom: 80,  // Tailwind "mb-20"
  },
  shortInputSpacing: {
    height: '33%',  // Tailwind "h-2/6"
    paddingBottom: 40,  // Tailwind "pb-10"
  },
  pressableButton: {
    borderRadius: 10,  // Tailwind "rounded-lg"
    paddingVertical: 20,  // Tailwind "p-5"
    marginBottom: 80,  // Tailwind "mb-20"
  },
  pressableButtonPressed: {
    backgroundColor: '#94a3b8',  // Tailwind "bg-slate-400"
  },
  pressableButtonDefault: {
    backgroundColor: '#f5f5f5',  // Tailwind "bg-inherit" (equivalent to default background color)
  },
  pressableText: {
    fontSize: 24,  // Tailwind "text-2xl"
    textAlign: 'center',
  },
});
