import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostInput from "../../components/PostInput"
import { useState } from 'react'
import { icons } from "../../constants"
import AttachFile from '../../components/AttachFile'
import TagsInput from '../../components/TagsInput'
import RippleButton from '../../components/RippleButton'
import { useProfile } from '../ProfileContext'  // Adjust path as needed
import { usePosts} from '../PostContext'      // Adjust path as needed
import { useRouter } from 'expo-router'

const Post = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const { addPost } = usePosts();
  const [isPressed, setIsPressed] = useState(false);
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    details: "",
    solution: ""
  });

  const handlePress = () => {
    setIsPressed((isPressed) => !isPressed);
  };

  const submitForm = async () => {
    try {
      // First, create the post in your context
      if (postData.title.trim() && postData.description.trim()) {
        const newPost = {
          title: postData.title.trim(),
          description: postData.description.trim(),
          username: profile?.name || 'Anonymous',
          createdAt: new Date().toISOString(),
          details: postData.details?.trim() || '',
          solution: postData.solution?.trim() || '',
          tags: tags || [],
        };
  
        addPost(newPost);
  
        // Format data for API
        const apiData = {
          title: postData.title.trim(),
          authorFirstName: profile?.name || "Anonymous",
          description: postData.description.trim(),
          details: postData.details?.trim() || '',
          solution: postData.solution?.trim() || '',
          tags: JSON.stringify(tags || []),  // Convert array to JSON string
        };
  
        // Then, submit to your API
        const response = await fetch('https://5270-129-110-241-55.ngrok-free.app/api/posts/MrSmithIsTheBest', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiData)
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const json = await response.json();
        console.log('API Response:', json);
  
        // Navigate to trending page after successful submission
        router.push('/trending');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Failed to submit post. Please try again.');
    }
  };

  // Validation function
  const isFormValid = () => {
    return postData.title.trim() && postData.description.trim();
  };

  return (
    <>
      <View className="flex bg-secondary-200 rounded-b-3xl pt-24 pb-2 pl-4 items-start justify-center">
        <Text className="text-5xl">Post an Issue</Text>
        <Text className="text-xl">Facing an Issue? Let others know.</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "70" }}
        className="pb-20 px-2 pt-10"
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps='handled'
      >
        <PostInput
          title="Title"
          description={"Be specific and imagine you're asking a question to another person"}
          valueProp={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e })}
          inputStyles={"h-3/6 mb-10"}
        />

        <PostInput
          title="What are the details?"
          description={"Introduce the problem and expand on what you put in the title. Minimum 20 characters."}
          valueProp={postData.description}
          onChange={(e) => setPostData({ ...postData, description: e })}
          inputStyles={"h-4/6 mb-20"}
          multi={true}
        />

        <PostInput
          title="What did you try?"
          valueProp={postData.solution}
          onChange={(e) => setPostData({ ...postData, solution: e })}
          inputStyles={"h-4/6 mb-10 pb-10"}
          multi={true}
        />

        <View className="flex flex-col justify-center p-0 m-0 items-start h-1/4 w-full">
          <Text className="text-4xl mb-3">Upload Images</Text>
          <View className="flex flex-row justify-start items-center space-x-14 w-full h-5/6">
            <AttachFile />
            <AttachFile />
          </View>
        </View>

        <View className="w-full flex justify-center items-center">
          <TagsInput onTagsChange={setTags} />
        </View>

        <RippleButton 
          onPress={submitForm} 
          title="Submit" 
          disabled={!isFormValid()}
        />
      </ScrollView>
    </>
  );
};

export default Post;