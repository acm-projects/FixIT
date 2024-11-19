import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import { icons, Images, images } from "../../constants";
import { TextInput } from 'react-native';
import { Icon } from '@rneui/themed';
import { Divider } from '@rneui/base';
import { router } from 'expo-router';
import Comments from '../../components/commentSection';
import { usePosts } from '../PostContext';
import tw from 'twrnc';
const SORT_OPTIONS = [
  { label: 'Most Votes', value: 'votes' },
  { label: 'Most Recent', value: 'recent' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Comments', value: 'comments' },
];

// Sort Dropdown Component
const SortDropdown = ({ onSortChange }) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  return (
    <View className="relative z-50">
      <Pressable
        onPress={() => setShowSortDropdown(!showSortDropdown)}
        className="flex-row items-center space-x-2 py-2 px-3 rounded-md"
        style={{ backgroundColor: '#D2BE92' }}
      >
        <Text style={{ color: '#23603F' }} className="text-lg font-medium">
          {selectedSort.label}
        </Text>
        <Icon
          name={showSortDropdown ? "chevron-up" : "chevron-down"}
          type="feather"
          size={20}
          color="#23603F"
        />
      </Pressable>

      {showSortDropdown && (
        <View
          style={{
            backgroundColor: '#E4D3BA',
            borderRadius: 8,
            position: 'absolute',
            top: 45,
            left: 10,
            right: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3.84,
            elevation: 5,
            borderWidth: 1,
            borderColor: '#B1A180',
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              className="py-3 px-4 flex-row items-center justify-between"
              onPress={() => {
                setSelectedSort(option);
                setShowSortDropdown(false);
                onSortChange(option.value);
              }}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#B1A180',
              }}
            >
              <Text
                style={{
                  color: '#23603F',
                  fontWeight: option.value === selectedSort.value ? '600' : '400',
                }}
                className="text-base"
              >
                {option.label}
              </Text>
              {option.value === selectedSort.value && (
                <Icon name="check" type="feather" size={18} color="#23603F" />
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const Trending = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { posts, setPosts } = usePosts();


  const handleSort = (sortType) => {
    const sortedPosts = [...posts];
    switch (sortType) {
      case 'votes':
        sortedPosts.sort((a, b) => b.votes - a.votes);
        break;
      case 'recent':
        sortedPosts.sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        sortedPosts.sort((a, b) => a.id - b.id);
        break;
      case 'comments':
        sortedPosts.sort((a, b) => b.comments - a.comments);
        break;
    }
    setPosts(sortedPosts);
  };

  const handlePostPress = (item) => {
    router.push({
      pathname: "/postDetail",
      params: { data: JSON.stringify(item) },
    });
  };

  const handleCommentPress = (item) => {
    setSelectedPost(item);
    setShowComments(true);
  };

  const renderItem = ({ item }) => (
    <View key={item.id} className="bg-white m-2 p-4 rounded-lg shadow-md">
      {/* Header with profile and username */}
      <View className="flex-row items-center mb-2">
        <Image 
          source={item.profileImage} 
          className="h-8 w-8 rounded-full"
        />
        <Text className="ml-2 text-gray-600 font-medium">{item.username}</Text>
      </View>
  
      {/* Post content */}
      <Pressable onPress={() => handlePostPress(item)}>
        <Text className="text-xl font-semibold mb-2" style={{ color: '#23603F' }}>
          {item.title}
        </Text>
        
        {item.img ? (
          <Image 
            source={item.img[0].uri} 
            className="w-full h-48 rounded-lg mb-2" 
            resizeMode="cover"
          />
        ) : (
          <Text className="text-gray-700 mb-3">{item.description}</Text>
        )}
  
        {/* Engagement metrics */}
        <View className="flex-row justify-between mt-2">
          <View className="flex-row items-center">
            <Icon name="arrow-up" type="feather" size={16} color="#672557" />
            <Text className="ml-1 text-gray-600">{item.votes}</Text>
          </View>
          <Pressable 
            onPress={() => handleCommentPress(item)}
            className="flex-row items-center"
          >
            <Icon name="message-circle" type="feather" size={16} color="#672557" />
            <Text className="ml-1 text-gray-600">{item.comments} comments</Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E4D3BA' }}>
      <ScrollView>

      <Text style={tw`h-12 text-white text-2xl font-bold text-center py-2 mb-4 w-100 bg-[#4A1B3D]`}>
      Community Forum
</Text>

      <View className="flex flex-row space-x-36 items-center p-2 w-full">
        <View className="w-1/2">
          <TextInput
            className="h-10 w-full px-7 text-black bg-slate-100 border-2 border-gray-300 rounded-2xl"
            placeholder="Search for a post"
            value={searchQuery}
            onChangeText={(e) => setSearchQuery(e)}
          />
          {searchQuery && (
            <Pressable
              className="absolute left-[157px] top-[13px]"
              onPress={() => setSearchQuery("")}
              hitSlop={20}
            >
              <Image className="w-4 h-4" source={icons.clear} />
            </Pressable>
          )}
        </View>
      </View>

      <SortDropdown onSortChange={handleSort} />

      <FlatList
      
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {selectedPost && (
        <Comments
          isVisible={showComments}
          onClose={() => setShowComments(false)}
          postId={selectedPost.id}
        />
      )}
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default Trending;
