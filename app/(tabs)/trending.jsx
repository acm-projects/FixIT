import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { icons, Images, images } from "../../constants"
import { TextInput } from 'react-native'
import { Icon } from '@rneui/themed'
import { Divider } from '@rneui/base'
import { router } from 'expo-router'
import Comments from '../../components/commentSection'

const SORT_OPTIONS = [
  { label: 'Most Votes', value: 'votes' },
  { label: 'Most Recent', value: 'recent' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Comments', value: 'comments' }
];

// Reddit-style Dropdown Component
const SortDropdown = ({ onSortChange }) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  return (
    <View className="relative">
      <Pressable
        onPress={() => setShowSortDropdown(!showSortDropdown)}
        className="flex-row items-center space-x-2 py-2 px-3 bg-black bg-opacity-5 rounded-md"
        style={{backgroundColor: '#D2BE92'}}
      >
        <Text style={{color: '#23603F'}} className="text-lg font-medium">
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
        <Pressable
          className="absolute top-0 left-0 right-0 bottom-0 h-screen w-screen"
          onPress={() => setShowSortDropdown(false)}
        >
          <View 
            style={{
              backgroundColor: '#1c1c1c',
              borderRadius: 8,
              position: 'absolute',
              top: 45,
              left: 10,
              right: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
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
                  borderBottomColor: '#333',
                }}
              >
                <Text 
                  style={{
                    color: option.value === selectedSort.value ? '#ffffff' : '#cccccc',
                    fontWeight: option.value === selectedSort.value ? '600' : '400',
                  }}
                  className="text-base"
                >
                  {option.label}
                </Text>
                {option.value === selectedSort.value && (
                  <Icon name="check" type="feather" size={18} color="#ffffff" />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      )}
    </View>
  );
};

const Trending = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Your original posts data
  const [posts, setPosts] = useState([
    // your post data here...
  ]);

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
      params: {
        data: JSON.stringify(item),
      },
    });
  };

  const handleCommentPress = (item) => {
    setSelectedPost(item);
    setShowComments(true);
  };

  const renderItem = ({ item }) => (
     <View key={item.id} className="w-full my-2">
      {/* User info */}
      <View className="w-full flex flex-start text-gray-500 space-x-2 flex-row items-center">
        <Image
          source={item.profileImage}
          className="h-5 w-5"
        />
        <Text className="text-md">{item.username}</Text>
      </View>

      {/* Post content */}
      <Pressable className="w-full" onPress={() => handlePostPress(item)}>
        <View className="w-full flex flex-col space-y-2">
          <Text className="text-3xl text-wrap my-1">{item.title}</Text>
              
            {item.img ? (
                  <View
                  className="w-5/6 border-2">
                    <Image
                    className="h-40 w-5/6"
                    source={item.img[0].uri}
                    resizeMode='contained'
                  />
                </View>
              ) : (
                <Text className="">{item.description}</Text>
              )}
              </View>
            </Pressable>

              <View className="flex flex-row my-1 items-center space-x-5">
                <View className="flex flex-row border border-gray-400 rounded-3xl p-1 space-x-3 items-center">
                  <Pressable>
                    <Image
                    source={icons.arrow_up}
                    className="h-5 w-5"/>
                  </Pressable>

          <Text className="text-xl text-gray-700">{item.votes}</Text>

          <Pressable>
            <Image
              source={icons.arrow_down}
              className="h-5 w-5"
            />
          </Pressable>
        </View>

        <Pressable 
          className="flex items-center space-x-2 px-2 py-3 rounded-2xl flex-row border-gray-400 border"
          onPress={() => handleCommentPress(item)}
        >
          <Image 
            className="h-4 w-5"
            source={icons.comment}
          />
          <Text className="text-md">{item.comments}</Text>
        </Pressable>
      </View>

      {/* Divider */}
      <Divider 
        style={{ backgroundColor: '#B1A180' }}
        width={1}
        className="mt-2"
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E4D3BA' }}>
      {/* Header */}
      <View style={{ backgroundColor: '#672557' }} className="justify-end items-start w-full rounded-b-3xl pt-24 pb-2 pl-4">
        <Text className="text-4xl font-bold text-white">Community Forum</Text>
      </View>

      {/* Search Bar */}
      <View className="flex flex-row space-x-36 items-center p-2 w-full">
        <View className="w-1/2">
          <TextInput
            className="h-10 w-full px-7 text-black bg-slate-100 border-2 border-gray-300 rounded-2xl"
            placeholder="Search for a post"
            value={searchQuery}
            onChangeText={(e) => setSearchQuery(e)}
          />
          <Image
            className="absolute left-2 top-3 w-4 h-4"
            source={icons.search}
          />
          {searchQuery && (
            <Pressable
              className="absolute left-[157px] top-[13px]"
              onPress={() => setSearchQuery("")}
              hitSlop={20}
            >
              <Image
                className="w-4 h-4"
                source={icons.clear}
              />
            </Pressable>
          )}
        </View>

        <SortDropdown onSortChange={handleSort} />
      </View>

      {/* Post List */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Comments Modal */}
      {selectedPost && (
        <Comments 
          isVisible={showComments}
          onClose={() => setShowComments(false)}
          postId={selectedPost.id}
        />
      )}
    </SafeAreaView>
  );
};

export default Trending;
