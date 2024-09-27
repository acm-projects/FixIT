import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView} from 'react-native'
import React from 'react'
import {icons,images} from "../../constants"
import trending_today from "../../constants/trending_today.js"

const Trending = () => {
  console.log(images.placeholderImage)
  return (
    <SafeAreaView>
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
      </View>
    </SafeAreaView>
  )
}

export default Trending
