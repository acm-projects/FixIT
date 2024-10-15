import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView,FlatList, Pressable} from 'react-native'
import React from 'react'
import {icons,images} from "../../constants"
import trending_today from "../../constants/trending_today.js"
import { TextInput } from 'react-native'
import FormField from "../../components/FormField"
import {useState} from 'react'
import { useStoreRootState } from 'expo-router/build/global-state/router-store.js'
import * as ImagePicker from "expo-image-picker"
import Post from "../../components/Post"


const Trending = () => {
  const [searchQuerry, setSearchQuerry] = useState("")
  const [image, setImage] = useState("")

  const DATA = [
    {
      id: '1',
      title: 'Title 1 of a reddit post',
      img: icons.placeholderImage,
    },
    {
      id: '2',
      title: 'Title 2 of a reddit post',
      img: icons.placeholderImage,
    },
    {
      id: '3',
      title: 'Title 3 of a reddit post',
      img: icons.placeholderImage,
    },
    {
      id: '4',
      title: 'Title 4 of a reddit post',
      img: icons.placeholderImage,
    },
    {
      id: '5',
      title: 'Title 4 of a reddit post',
      img: icons.placeholderImage,
    },
    {
      id: '6',
      title: 'Title 4 of a reddit post',
      img: icons.placeholderImage,
    },
    {
      id: '7',
      title: 'Title 4 of a reddit post',
      img: icons.placeholderImage,
    },{
      id: '8',
      title: 'Title 4 of a reddit post',
      img: icons.placeholderImage,
    },{
      id: '9',
      title: 'Title 4 of a reddit post',
      img: icons.placeholderImage,
    },{
      id: '10',
      title: 'Title 4 of a reddit post',
      img: icons.placeholderImage,
    },
  ];
 

  return (
    <SafeAreaView className="h-dvh">
      <View className="bg-slate-500 h-14 w-full"></View>

      <View className="flex flex-col space-y-2">
        <Text className="text-3xl pl-3 mt-5 font-pmedium">Most Upvoted</Text>
      
          <ScrollView className="h-40 w-full" contentContainerStyle={
            {display:"flex", 
            justifyContent: "center", 
            alignItems:"center",
            paddingLeft: 10,
            gap:10}} 
            horizontal>

          
          
          {/* {trending_today.forEach((element) => <View >
              <Image 
              source={element["sources"]}
              className="h-20 w-20"
              ></Image>

              <Text>
                {element.title}
              </Text>
           </View>)}  */}
           
            <View >
              <Image 
              source={images.placeholderImage}
              className="h-20 w-20"
              ></Image>

              <Text>
                Office Chairs
              </Text>
           </View> 

           <View >
              <Image 
              source={images.placeholderImage}
              className="h-20 w-20"
              ></Image>

              <Text>
                Office Chairs
              </Text>
           </View> 

           <View >
              <Image 
              source={images.placeholderImage}
              className="h-20 w-20"
              ></Image>

              <Text>
                Office Chairs
              </Text>
           </View> 

           <View >
              <Image 
              source={images.placeholderImage}
              className="h-20 w-20"
              ></Image>

              <Text>
                Office Chairs
              </Text>
           </View> 

           <View >
              <Image 
              source={images.placeholderImage}
              className="h-20 w-20"
              ></Image>

              <Text>
                Office Chairs
              </Text>
           </View>  
        </ScrollView>


        {/*search and sort by */}

        <View className="flex space-x-20 border-t-2 pt-2 justify-center px-10 h-fit flex-row w-full ">

          {/* search */}
            <View className="flex w-15 flex-row h-fit">
              <Image 
              source={icons.search}
              className="w-10 h-10 text-slate- text-slate-500 ">
              </Image>

              <TextInput
              className="text-black w-3/6 h-full bg-slate-200 border-1 font-psemibold rounded-lg text-base"
              value={searchQuerry}
              placeholder="Search"
              onChangeText={(text) => {setSearchQuerry(text)}}
              />

            </View>

            {/* Sort By */}
            <View className="flex space-x-3 items-center flex-row">
              <Image 
                source={icons.sort}
                className="w-8 h-8 text-slate- text-slate-500 ">
              </Image>

              <Text className="text-3xl">
                Sort
              </Text>
            </View> 
        </View>
        
      </View>  

      {/* Divider */}
        <View className="w-full flex justify-center pt-5 items-center">
            <View className="border-2 border-slate-400 w-5/6"></View>
        </View>

      <FlatList
        contentContainerStyle={{display:"flex", justifyContent:"center", alignItems:"center", flex:"column"}}
        className="border-2 border-red-400 p-5 mt-5 h-80"
        data={DATA}
        renderItem={({item}) => 
          {
            return <Pressable onPressIn={console.log("pressed")} className="m-5 h-9">
              <View>
                <Text>{item.title}</Text>

              </View>
            </Pressable>
          }}
        keyExtractor={item => item.id}
      >

      </FlatList>
    </SafeAreaView>
  )
}

export default Trending
