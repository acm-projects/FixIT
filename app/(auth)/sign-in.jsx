import { StyleSheet, ScrollView, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import ThirdPartyButton from '../../components/ThirdPartyButton'
import {icons} from "../../constants"

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center mt-5 h-full px-4">
          <Text className="text-gray-100 text-5xl mt-5 ">FIXIT</Text>
          <Text className="text-gray-100 text-semibold font-psemibold text-xl mt-5">Log in to Fixit</Text>
          
          <FormField
            title="Username"
            value={form.username}
            placeholder="johndoe85"
            handleChangeText={(e) => setForm({...form,username:e})}
            otherStyles="mt-7"
            
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form,password:e})}
            otherStyles="mt-7"

          />


          <View className="flex justify-center w-full flex-col items-center">
            
            <Text className="mt-5 text-center font-psemibold text-gray-100">
              Don't have an Account? <Link className="text-amber-800" href="/sign-up">Sign up</Link>
            </Text>
            
            <CustomButton
              name="Sign In"

              handlePress={() => {
                console.log(form)
                setForm({username:'', password:''})
              }}
              ContainerStyles={"border-2 border-red-400 mt-8 mb-6 h-12 bg-amber-800 rounded-2xl text-white"}
              textStyles={"text-gray-300"}
              >
            </CustomButton>
            
            <ThirdPartyButton
              name="Sign In with Google"
              handlePress={() => {
                console.log("Sign In with Google")
              }}
              iconSource={icons.google_g_logo}
              ContainerStyles={"mt-12"}
              textStyles={"text-gray-300"}
              >
            </ThirdPartyButton>
            
            <ThirdPartyButton
              name="Sign In with Outlook"
              handlePress={() => {
                console.log("Sign In with Outlook")
              }}
              iconSource={icons.outlook_logo}
              ContainerStyles={"mt-5"}
              textStyles={"text-gray-300"}
              >
            </ThirdPartyButton>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})