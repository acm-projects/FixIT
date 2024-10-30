import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView,FlatList, Pressable} from 'react-native'
import React from 'react'
import {icons,Images,images} from "../../constants"
import trending_today from "../../constants/trending_today.js"
import { TextInput } from 'react-native'
import FormField from "../../components/FormField"
import {useState} from 'react'
import { useStoreRootState } from 'expo-router/build/global-state/router-store.js'
import * as ImagePicker from "expo-image-picker"
import Post from "../../components/Post"
import { SearchBar } from '@rneui/themed';
import { Icon } from '@rneui/themed'
import { Divider } from '@rneui/base'
import ReanimatedCarousel from '../../components/ReanimatedCarousel'


const trending = () => {
  const [searchQuerry, setSearchQuerry] = useState("")
  const [image, setImage] = useState("")


  const DATA = [
    {
      id: '1',
      title: 'Title 1 of a reddit post',
      username: "IndianStockMarket",
      description: "Lorem ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centu",
      profileImage:icons.profile,
      votes: 0,
      comments:1,
    },
    {
      id: '2',
      title: 'Title 2 of a reddit post',
      username: "wise",
      description: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letter",
      profileImage:icons.profile1,
      votes: 2,
      comments:4,
      img: [{id: 1, uri:images.placeholderImage}, {id:2, uri:images.cards}],
    },
    {
      id: '3',
      title: 'Title 3 of a reddit post',
      username:"fatFire",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source",
      profileImage:icons.profile2,
      votes: 6,
      comments:9,
      img: images.placeholderImage,
    },
    {
      id: '4',
      title: 'Title 4 of a reddit post',
      username:"aggies",
      description:"able. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks ",
      profileImage:icons.profile,
      votes: 10,
      comments: 0,
      img: images.placeholderImage,
    },
    {
      id: '5',
      title: 'Title 1 of a reddit post',
      username: "IndianStockMarket",
      description: "Lorem ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centu",
      profileImage:icons.profile1,
      votes: 11,
      comments: 5,
    },
    {
      id: '6',
      title: 'Title 1 of a reddit post',
      username: "IndianStockMarket",
      description: "Lorem ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centu",
      profileImage:icons.profile2,
      votes: 12,
      comments: 4,
      img: images.placeholderImage,
    },
    {
      id: '7',
      title: 'Title 1 of a reddit post',
      username: "IndianStockMarket",
      description: "Lorem ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centu",
      profileImage:icons.profile,
      votes: 15,
      comments: 9,
    },
    {
      id: '8',
      title: 'Title 1 of a reddit post',
      username: "IndianStockMarket",
      description: "Lorem ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centu",
      profileImage:icons.profile2,
      votes: 20,
      comments: 10,
      img:[images.placeholderImage, images.placeholderImage],
    },
    {
      id: '9',
      title: 'Title 1 of a reddit post',
      username: "IndianStockMarket",
      description: "Lorem ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centu",
      profileImage:icons.profile2,
      votes: 3,
      comments: 11,
      img: images.placeholderImage,
    },
    {
      id: '10',
      title: 'Title 1 of a reddit post',
      username: "IndianStockMarket",
      description: "Lorem ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centu",
      profileImage:icons.profile,
      votes: 1,
      comments: 12,
      img: images.placeholderImage,
    },
  ];
 

  return (
    <>
      <View className="justify-end items-start bg-secondary-100 font-semibold w-full rounded-b-3xl pt-24 pb-2 pl-4">
        <Text className="text-4xl font-bold">Community Forum</Text>
      </View>

      <View className="flex flex-row space-x-36 items-center p-2 w-full">
        <View className="w-1/2">
          <TextInput
          className="h-10 w-full px-7 text-black bg-slate-100 border-2 border-gray-300 rounded-2xl"
          placeholder="Search for a post"
          value={searchQuerry}
          onChangeText={(e)=> setSearchQuerry(e)}
          />
        
          
          <Image 
          className="absolute left-2 top-3 w-4 h-4"
          source={icons.search}>
          </Image>

          {searchQuerry ? <Pressable
          className="absolute left-[157px] top-[13px]"
          onPress={() => setSearchQuerry("")}
          hitSlop={20}
          >
            <Image 
            className="w-4 h-4"
            source={icons.x_button}></Image>
          </Pressable> : ""}
        </View>

        <Pressable
        onPress={()=> console.log("sort by")}>
        <Image
          className="w-8 h-8"
          source={icons.filter}></Image>    
          </Pressable>
        
      </View>

      <View className="flex flex-col space-y-2">
        <Text className="text-xl pl-3 mt-5 font-pmedium">Most Upvoted</Text>
      
          <ScrollView className="h-1/6 w-full" contentContainerStyle={
            {display:"flex", 
            justifyContent: "center", 
            alignItems:"center",
            paddingLeft: 10,
            gap:10,
            paddingRight: 10}} 
            horizontal>

          
          
          {DATA.map((element) => <View >
              <Image 
              key={element.id}
              source={element.img}
              className="h-full w-20 rounded-xl"
              ></Image>

              <Text className="absolute bottom-1 right-1 pr-1">
                {element.title}
              </Text>
           </View>)} 
           
        </ScrollView>
        
      </View>  

      {/* Divider */}
      <View className="py-4 px-3">
        <Divider
        className=""
        width={1}/>
      </View>

      <FlatList
        contentContainerStyle={{display:"flex", justifyContent:"center", alignItems:"center", flex:"column"}}
        className="p-5 h-80"
        data={DATA}
        
        renderItem={({item}) => 
          {
            return <View key={item.id} className="w-full my-2">
              <View className="w-full flex flex-start text-gray-500 space-x-2 flex-row items-center">
                  <Image
                  source={item.profileImage}
                  className="h-5 w-5"></Image>

                  <Text className="text-md">{item.username}</Text>
                </View>

              <Pressable onPressIn={console.log("pressed")} className="w-full">
                <View className={`w-full flex ${item.img ? "flex-col space-y-2" : "flex-col"}`}>
                  <Text className="text-3xl text-wrap my-1">{item.title}</Text>

                  {item.img ? <ReanimatedCarousel data={item.img}/> : <Text className="">{item.description}</Text> }
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
                    className="h-5 w-5"/>
                  </Pressable>
                </View>

                <Pressable className="flex items-center space-x-2 px-2 py-3 rounded-2xl flex-row border-gray-400 border">
                  <Image 
                  className="h-4 w-5"
                  source={icons.comment}></Image>

                  <Text className="text-md">{item.comments}</Text>
                </Pressable>
              </View>

              <View className="mt-2">
              <Divider
              width={1}
              />
              </View>
            </View>
          }}
        keyExtractor={item => item.id}
      >

      </FlatList>
      </>
  )
}

export default trending
