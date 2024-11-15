import { View, Text, Modal, Pressable, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/themed'

const Comments = ({ isVisible, onClose, postId }) => {
  const [comments] = useState([
    {
      id: '1',
      username: '@Everstranger',
      text: "I don't have a cat, but I'm using your videos to help keep my roommates kitten happy to the best of my ability.",
      likes: 3200,
      timeAgo: '2y ago'
    },
    {
      id: '2',
      username: '@kenziescout2343',
      text: 'Big s/o to Jackson for educating us every week instead of saying "read my book". He sells his books & products for the cats, not for himself 🐱🐱 what a rad guy',
      likes: 3700,
      timeAgo: '2y ago'
    }
  ])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black bg-opacity-50">
        <View style={{backgroundColor: '#E4D3BA'}} className="flex-1 mt-20 rounded-t-3xl">
          {/* Header */}
          <View style={{borderColor: '#B1A180'}} className="flex-row justify-between items-center p-4 border-b">
            <View className="flex-row space-x-4">
              <Pressable 
                style={{backgroundColor: '#D2BE92'}}
                className="px-4 py-2 rounded-full"
                onPress={() => {}}
              >
                <Text style={{color: '#23603F'}} className="font-medium">Top</Text>
              </Pressable>
              <Pressable 
                className="px-4 py-2"
                onPress={() => {}}
              >
                <Text style={{color: '#672557'}} className="text-gray-500">Newest</Text>
              </Pressable>
            </View>
            <Pressable onPress={onClose}>
              <Icon name="x" type="feather" size={24} color="#23603F" />
            </Pressable>
          </View>

          {/* Comments List */}
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            className="flex-1 px-4"
            renderItem={({item}) => (
              <View style={{borderColor: '#B1A180'}} className="py-4 border-b">
                <View className="flex-row justify-between">
                  <Text style={{color: '#23603F'}} className="font-medium">{item.username}</Text>
                  <Text style={{color: '#672557'}} className="text-gray-500">{item.timeAgo}</Text>
                </View>
                <Text style={{color: '#672557'}} className="mt-2">{item.text}</Text>
                <View className="flex-row items-center space-x-4 mt-2">
                  <Pressable className="flex-row items-center space-x-1">
                    <Icon name="thumbs-up" type="feather" size={16} color="#23603F" />
                    <Text style={{color: '#23603F'}}>{item.likes}</Text>
                  </Pressable>
                  <Pressable>
                    <Text style={{color: '#23603F'}}>Reply</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          {/* Comment Input */}
          <View style={{borderColor: '#B1A180'}} className="p-4 border-t">
            <View style={{backgroundColor: '#D2BE92'}} className="flex-row items-center space-x-2 px-4 py-2 rounded-full">
              <TextInput
                placeholder="Add a comment..."
                placeholderTextColor="#672557"
                className="flex-1"
                style={{color: '#23603F'}}
              />
              <Pressable>
                <Icon name="send" type="feather" size={20} color="#23603F" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Comments