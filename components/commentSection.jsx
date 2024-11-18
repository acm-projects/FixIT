import { View, Text, Modal, Pressable, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/themed'
import { commentsData } from './commentsData'

const Comments = ({ isVisible, onClose, postId }) => {
  const [sortBy, setSortBy] = useState('top'); // 'top' or 'newest'
  const [newComment, setNewComment] = useState('');

  // Get comments for this specific post
  const postComments = commentsData[postId] || [];

  // Flatten comments and replies into a single array for FlatList
  const flattenedComments = postComments.reduce((acc, comment) => {
    acc.push(comment);
    if (comment.replies) {
      comment.replies.forEach(reply => {
        acc.push({ ...reply, isReply: true });
      });
    }
    return acc;
  }, []);

  // Sort comments based on likes or timestamp
  const sortedComments = [...flattenedComments].sort((a, b) => {
    if (sortBy === 'top') {
      return b.likes - a.likes;
    } else {
      // Convert timestamp strings to comparable values (newer first)
      const aTime = parseInt(a.timestamp.split(' ')[0]);
      const bTime = parseInt(b.timestamp.split(' ')[0]);
      return aTime - bTime;
    }
  });

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
                style={{
                  backgroundColor: sortBy === 'top' ? '#D2BE92' : 'transparent'
                }}
                className="px-4 py-2 rounded-full"
                onPress={() => setSortBy('top')}
              >
                <Text 
                  style={{color: sortBy === 'top' ? '#23603F' : '#672557'}} 
                  className="font-medium"
                >
                  Top
                </Text>
              </Pressable>
              <Pressable 
                style={{
                  backgroundColor: sortBy === 'newest' ? '#D2BE92' : 'transparent'
                }}
                className="px-4 py-2 rounded-full"
                onPress={() => setSortBy('newest')}
              >
                <Text 
                  style={{color: sortBy === 'newest' ? '#23603F' : '#672557'}} 
                  className="font-medium"
                >
                  Newest
                </Text>
              </Pressable>
            </View>
            <Pressable onPress={onClose}>
              <Icon name="x" type="feather" size={24} color="#23603F" />
            </Pressable>
          </View>

          {/* Comments List */}
          <FlatList
            data={sortedComments}
            keyExtractor={(item) => item.id}
            className="flex-1 px-4"
            renderItem={({item}) => (
              <View 
                style={{
                  borderColor: '#B1A180',
                  marginLeft: item.isReply ? 40 : 0
                }} 
                className="py-4 border-b"
              >
                <View className="flex-row justify-between">
                  <Text style={{color: '#23603F'}} className="font-medium">{item.username}</Text>
                  <Text style={{color: '#672557'}} className="text-gray-500">{item.timestamp}</Text>
                </View>
                <Text style={{color: '#672557'}} className="mt-2">{item.text}</Text>
                <View className="flex-row items-center space-x-4 mt-2">
                  <Pressable className="flex-row items-center space-x-1">
                    <Icon 
                      name="heart" 
                      type="font-awesome" 
                      size={16} 
                      color="#23603F" 
                    />
                    <Text style={{color: '#23603F'}}>{item.likes}</Text>
                  </Pressable>
                  {!item.isReply && (
                    <Pressable>
                      <Text style={{color: '#23603F'}}>Reply</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center py-8">
                <Text style={{color: '#672557'}} className="text-lg italic">
                  No Comments Yet
                </Text>
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
                value={newComment}
                onChangeText={setNewComment}
              />
              <Pressable onPress={() => {
                // Add logic to handle new comment submission
                setNewComment('');
              }}>
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