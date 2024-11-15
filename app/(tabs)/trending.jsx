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
    <View className="relative z-50">
      <Pressable
        onPress={() => setShowSortDropdown(!showSortDropdown)}
        className="flex-row items-center space-x-2 py-2 px-3 rounded-md"
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
        </Pressable>
      )}
    </View>
  );
};

const trending = () => {
  const [searchQuerry, setSearchQuerry] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Your original posts data
  const [posts] = useState([
    {
      id: '1',
      title: "How do I connect to UTD WiFi on my phone?",
    username: "NetStudent22",
    description: "I'm having trouble connecting to 'UTD WiFi' on my Android phone. Every time I try to connect, it keeps asking for authentication. I've tried my NetID and password but it's not working. Any help would be appreciated!",
    profileImage: icons.profile1,
    votes: 15,
    comments: 8,
      
    },
    {
      id: '2',
      title: "Computer lab software request",
    username: "LabRat23",
    description: "Does anyone know if we can request specific software to be installed in the computer labs? I need access to AutoCAD for a project but can't find it on any lab computers.",
    profileImage: icons.profile5,
    votes: 7,
    comments: 4,
      img: [{id:1, uri:images.placeholderImage}, {id:2, uri:images.cards}, {id:3, uri:images.cards}, {id:4, uri:images.cards}],
    },
    {
      id: '3',
      title: 'UTGuest no longer works on Chromebook',
      username: "IndianStockMarket",
      description: "I’ve been using the UTDGuest wifi for a couple of years now when I’m in class bc my Chromebook refuses to connect to CometNet lol (I think it’s just a Chromebook issue, I’ve heard a few people talk about the same problem)",
      profileImage: icons.profile,
      votes: 0,
      comments: 1,
      img: [{id:1, uri:images.placeholderImage}],
    },
    {
      id: '4',
      title: "eLearning down for maintenance?",
      username: "ClassAccess404",
      description: "Is eLearning supposed to be down right now? I'm trying to submit an assignment due tonight but can't access the platform. Getting a maintenance message.",
      profileImage: icons.profile2,
      votes: 32,
      comments: 12,
      img: [{id:1, uri:images.cards}],
    },
    {
      id: '5',
      title: "Password reset not working",
    username: "TechComet",
    description: "I've been trying to reset my password through the NetID management portal but I'm not receiving the reset email. I've checked my spam folder too. What should I do?",
    profileImage: icons.profile3,
    votes: 8,
    comments: 6,
    },
    {
      id: '6',
      title: "Microsoft Office installation issue",
      username: "OfficeNinja",
      description: "When trying to install Microsoft Office through the UTD software center, I keep getting an error code 30125-1711. Has anyone else encountered this issue?",
      profileImage: icons.profile4,
      votes: 5,
      comments: 3,
      img: [{id:1, uri:images.cards}],
    },
    {
      id: '7',
      title: "Zoom recording not showing up",
    username: "ZoomStudent",
    description: "My professor said they recorded today's lecture but I can't find it in eLearning. Usually recordings show up within an hour, but it's been 3 hours now. Is there a delay in processing?",
    profileImage: icons.profile5,
    votes: 12,
    comments: 7,
    },
    {
      id: '8',
      title: "VPN connection drops frequently",
    username: "RemoteScholar",
    description: "I'm trying to access library resources from home using the UTD VPN, but the connection keeps dropping every 10-15 minutes. Anyone else experiencing this?",
    profileImage: icons.profile1,
    votes: 18,
    comments: 9,
      img: [{id:1, uri:images.placeholderImage}, {id:2, uri:images.cards}],
    },
    {
      id: '9',
      title: "Multi-factor authentication not accepting code",
    username: "SecurityPro",
    description: "The 2FA system isn't accepting my codes from the Microsoft Authenticator app. I've tried multiple times and made sure the time on my phone is correct.",
    profileImage: icons.profile2,
    votes: 25,
    comments: 11,
      img: [{id:1, uri:images.placeholderImage}],
    },
    {
      id: '10',
      title: "Cannot access Galaxy email",
    username: "EmailExplorer",
    description: "Getting a 'Your account has been temporarily locked' message when trying to log into my Galaxy email. I haven't changed anything recently.",
    profileImage: icons.profile3,
    votes: 20,
    comments: 15,
      img: [{id:1, uri:images.placeholderImage}],
    },
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
  
  return (
    
    <SafeAreaView style={{backgroundColor: '#E4D3BA'}} className="flex-1">
      {/* Header */}
      <View style={{backgroundColor: '#672557'}} className="justify-end items-start w-full rounded-b-3xl pt-24 pb-2 pl-4">
        <Text className="text-4xl font-bold text-white">Community Forum</Text>
      </View>

      {/* Search Bar */}
      <View className="flex flex-row space-x-36 items-center p-2 w-full">
        <View className="w-1/2">
          <TextInput
            className="h-10 w-full px-7 text-black bg-slate-100 border-2 border-gray-300 rounded-2xl"
            placeholder="Search for a post"
            value={searchQuerry}
            onChangeText={(e)=> setSearchQuerry(e)}
          />{/*
          
                    <Image 
            className="absolute left-2 top-3 w-4 h-4"
            source={icons.search}
          />
          
          */}

          {searchQuerry && (
            <Pressable
              className="absolute left-[157px] top-[13px]"
              onPress={() => setSearchQuerry("")}
              hitSlop={20}
            >
              <Image 
                className="w-4 h-4"
                source={icons.x_button}
              />
            </Pressable>
          )}
        </View>
      </View>

      {/* Sort Dropdown */}
      <View className="px-3 mt-5">
        <SortDropdown 
          onSortChange={handleSort}
          onDropdownToggle={(isOpen) => setDropdownOpen(isOpen)}
        />
      </View>

      {/* Horizontal ScrollView for posts */}


      <Divider 
        style={{backgroundColor: '#B1A180'}}
        className="my-4 mx-3"
      />

      {/* Posts List */}
      <FlatList
      
        contentContainerStyle={{display:"flex", justifyContent:"center", alignItems:"center"}}
        className="p-5 h-80"
        data={posts}
        renderItem={({item}) => (
          <View key={item.id} className="w-full my-2">
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
