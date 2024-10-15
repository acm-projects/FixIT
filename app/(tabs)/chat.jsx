import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import PostInput from '../../components/PostInput'

const Chat = () => {
  return (
    <SafeAreaView className="h-full border-2 border-blue-600 pb-0">

       <View className="h-32 w-full border-2 bg-slate-700"></View>
       <View className="h-32 w-full bg-slate-700"></View>
      
      <ScrollView contentContainerStyle={{flexDirection:"column", justifyContent:"center", alignItems:"center",gap:"5"}} className="pb-10 border-2 h-96 ">
        <Text>HELlo</Text>
      
        <View className="h-32 w-full border-2 bg-slate-700"></View>
        <View className="h-32 w-full bg-slate-700"></View>
        <View className="h-32 w-full bg-slate-700"></View>
        <View className="h-32 w-full bg-slate-700"></View>
        <View className="h-32 w-full bg-slate-700"></View>
        <View className="h-32 w-full bg-slate-700"></View>
        <View className="h-32 w-full bg-slate-700"></View>
        <View className="h-32 w-full bg-slate-700"></View>
        <View className="h-32 w-full bg-slate-700"></View>
        <View className="h-32 w-full bg-red-300"></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({})