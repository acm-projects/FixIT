import React, { useState } from 'react';
import { YStack, XStack, ScrollView, Text, Pressable, SafeAreaView } from 'tamagui';
import PostInput from "../../components/postInput";
import { icons } from "../../constants";

const Post = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    description: "", 
    details: "",
    solution: ""
  });

  const handlePress = () => {
    setIsPressed((prevState) => !prevState);
  };

  const submitForm = () => {
    console.log(postData);
  };

  return (
    <SafeAreaView flex={1} paddingBottom={0} marginBottom={0}>
      <YStack backgroundColor="#64748b" height={56} width="100%" />

      <YStack alignItems="center" justifyContent="center" borderBottomWidth={2}>
        <Text paddingTop={40} fontSize={40}>Post an Issue</Text>
      </YStack>

      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 70,
          paddingBottom: 80,
          paddingHorizontal: 8,
          paddingTop: 40,
        }}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
      >
        <PostInput
          title="Title"
          description="Be specific and imagine you're asking a question to another person"
          valueProp={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e })}
          inputStyles={{ height: "50%", marginBottom: 40 }}
        />

        <PostInput
          title="What are the details?"
          description="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
          valueProp={postData.description}
          onChange={(e) => setPostData({ ...postData, description: e })}
          inputStyles={{ height: "66%", marginBottom: 80 }}
          multi={true}
        />

        <PostInput
          title="What did you try?"
          valueProp={postData.solution}
          onChange={(e) => setPostData({ ...postData, solution: e })}
          inputStyles={{ height: "66%", marginBottom: 80 }}
          multi={true}
        />

        <PostInput
          title="Tags"
          description="Add up to 5 tags to describe your issue."
          inputStyles={{ height: "33%", paddingBottom: 40 }}
        />

        <Pressable
          borderRadius={10}
          paddingVertical={20}
          marginBottom={80}
          backgroundColor={isPressed ? '#94a3b8' : '#f5f5f5'}
          onPressIn={handlePress}
          onPressOut={handlePress}
          onPress={submitForm}
        >
          <Text fontSize={24} textAlign="center">PRESS ME TO SUBMIT</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
