import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import {images,icons} from "../constants"
import { Divider } from '@rneui/base'

const Comment = ({profileImage, username, comment, votes}) => {
  return (
    <>
    <View className="flex flex-row">
        {/*contianer for the profile icon*/}
        <View>
          <Image 
          source={profileImage}
          className="w-5 h-5"></Image>
        </View>

        {/*contianer for the description and images*/}
        <View className="flex flex-col">
        <Text className="text-md">{username}</Text>
        <Text className="text-xl">{comment}</Text>
        </View>
      </View>

      {/*contianer for the divider and upvote*/}
      <View>

        {/*contianer for the upvote*/}
        <View>
        <View className="flex flex-row my-1 items-center space-x-5">
                <View className="flex flex-row border border-gray-400 rounded-3xl p-1 space-x-3 items-center">
                  <Pressable>
                    <Image
                    source={icons.arrow_up}
                    className="h-5 w-5"/>
                  </Pressable>

                  <Text className="text-xl text-gray-700">{votes}</Text>

                  <Pressable>
                    <Image
                    source={icons.arrow_down}
                    className="h-5 w-5"/>
                  </Pressable>
                </View>
              </View>
        </View>
      </View>
    </>
  )
}

export default Comment