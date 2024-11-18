import {  Text, View, SafeAreaView, Image, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Divider } from '@rneui/base'
import { Icon } from '@rneui/themed'
import CommentSection from '../components/comSection'
import { commentsData } from '../components/commentsData'

const PostDetail = () => {
  const params = useLocalSearchParams();
  const postData = JSON.parse(params.data);

  return (
    <SafeAreaView style={{backgroundColor: '#E4D3BA'}} className="flex-1">
      {/* Header */}
      <View style={{backgroundColor: '#672557'}} className="justify-end items-start w-full rounded-b-3xl pt-24 pb-2 pl-4">
        <Text className="text-4xl font-bold text-white">Post Details</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* User Info Section */}
        <View className="flex-row items-center space-x-3 mt-4">
          <Image
            source={postData.profileImage}
            className="h-12 w-12 rounded-full"
          />
          <Text style={{color: '#23603F'}} className="text-lg font-medium">{postData.username}</Text>
        </View>

        {/* Post Content */}
        <View className="mt-4">
          <Text style={{color: '#23603F'}} className="text-2xl font-bold mb-4">{postData.title}</Text>
          
          {postData.img ? (
            <View className="w-full h-64 mb-4">
              <Image
                source={postData.img[0].uri}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
          ) : null}
          
          <Text style={{color: '#672557'}} className="text-base">{postData.description}</Text>
        </View>

        {/* Interaction Buttons */}
        <View className="flex-row items-center space-x-4 my-4">
          {/* Votes Section */}
          <View style={{borderColor: '#B1A180'}} className="flex-row border rounded-3xl p-2 space-x-3 items-center">
            <Pressable>
              <Icon
                name="arrow-up"
                type="feather"
                size={20}
                color="#23603F"
              />
            </Pressable>

            <Text style={{color: '#23603F'}} className="text-xl">{postData.votes}</Text>

            <Pressable>
              <Icon
                name="arrow-down"
                type="feather"
                size={20}
                color="#23603F"
              />
            </Pressable>
          </View>

          {/* Comments Count */}
          <View 
            style={{borderColor: '#B1A180', backgroundColor: '#D2BE92'}}
            className="flex-row items-center space-x-2 px-4 py-2 rounded-2xl border"
          >
            <Icon
              name="message-circle"
              type="feather"
              size={20}
              color="#23603F"
            />
            <Text style={{color: '#23603F'}} className="text-base">
              {commentsData[postData.id]?.length || 0} Comments
            </Text>
          </View>
        </View>

        <Divider width={1} color="#B1A180" className="mb-4"/>

        {/* Comment Section - Notice how we pass the postData.id */}
        <CommentSection postId={postData.id} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PostDetail