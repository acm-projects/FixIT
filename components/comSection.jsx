import React, { useState } from 'react';
import { View, Text, Image, Pressable, TextInput } from 'react-native';
import { Icon } from '@rneui/themed';
import { commentsData } from './commentsData';

const CommentItem = ({ comment, isReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <View className={`mb-4 ${isReply ? 'ml-12' : ''}`}>
      <View className="flex-row space-x-3">
        {/* Profile Image Placeholder */}
        <View className="h-10 w-10 rounded-full bg-gray-300" />
        
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text style={{color: '#23603F'}} className="font-medium">{comment.username}</Text>
            <Text style={{color: '#672557'}} className="text-sm">{comment.timestamp}</Text>
          </View>
          
          <Text style={{color: '#23603F'}} className="mt-1">{comment.text}</Text>
          
          <View className="flex-row items-center space-x-4 mt-2">
            <Pressable 
              className="flex-row items-center space-x-1"
              onPress={() => setLiked(!liked)}
            >
              <Icon
                name={liked ? "heart" : "heart-o"}
                type="font-awesome"
                size={16}
                color="#23603F"
              />
              <Text style={{color: '#23603F'}}>{comment.likes}</Text>
            </Pressable>
            
            {!isReply && (
              <Pressable 
                className="flex-row items-center space-x-1"
                onPress={() => setShowReplyInput(!showReplyInput)}
              >
                <Icon
                  name="reply"
                  type="font-awesome"
                  size={16}
                  color="#23603F"
                />
                <Text style={{color: '#23603F'}}>Reply</Text>
              </Pressable>
            )}
          </View>

          {showReplyInput && (
            <View className="mt-2">
              <TextInput
                style={{
                  backgroundColor: '#D2BE92',
                  color: '#23603F',
                  borderColor: '#B1A180'
                }}
                className="border rounded-lg p-2"
                placeholder="Write a reply..."
                placeholderTextColor="#23603F"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const CommentSection = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const comments = commentsData[postId] || [];

  return (
    <View className="mt-4">
      <Text style={{color: '#23603F'}} className="text-lg font-bold mb-4">
        Comments ({comments.length})
      </Text>

      {/* New Comment Input */}
      <View className="mb-4">
        <TextInput
          style={{
            backgroundColor: '#D2BE92',
            color: '#23603F',
            borderColor: '#B1A180'
          }}
          className="border rounded-lg p-3"
          placeholder="Write a comment..."
          placeholderTextColor="#23603F"
          value={newComment}
          onChangeText={setNewComment}
        />
      </View>

      {/* Comments List */}
      {comments.length === 0 ? (
        <Text style={{color: '#672557'}} className="text-center italic">
          No Comments Yet
        </Text>
      ) : (
        comments.map(comment => (
          <View key={comment.id}>
            <CommentItem comment={comment} isReply={false} />
            {comment.replies?.map(reply => (
              <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
          </View>
        ))
      )}
    </View>
  );
};

export default CommentSection;