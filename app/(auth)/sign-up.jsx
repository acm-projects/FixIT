import { StyleSheet, ScrollView, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import ThirdPartyButton from '../../components/ThirdPartyButton'
import {icons} from "../../constants"
import axios from "axios"
const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
  })

  const handleSubmit = async(
    username,
    email, 
    password, 
    firstName="Ugonna", 
    lastName="Anyalemechi", 
    yearClassification="sophmore", 
    major="CS") => {
    

    try {
      const resp = await axios.post("http://localhost:3000/api/users", {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        yearClassification: yearClassification,
        major: major,
      });
    
      // Handle success
      console.log(resp);       // Full response object
      console.log(resp.data);  // Data from the response
    } catch (err) {
      // Handle error
      console.error(err);      // Full error object
      if (err.response) {
        // The server responded with a status code outside the 2xx range
        console.log("Error response data:", err.response.data);
        console.log("Error response status:", err.response.status);
        console.log("Error response headers:", err.response.headers);
      } else if (err.request) {
        // No response was received (e.g., server is unreachable)
        console.log("Error request:", err.request);
      } else {
        // Something else triggered the error
        console.log("Error message:", err.message);
      }
    }

    
  
  

}
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center mt-5 h-full px-4">
          <Text className="text-gray-100 text-5xl mt-5 ">FIXIT</Text>
          <Text className="text-gray-100 text-semibold font-psemibold text-xl mt-5">Sign Up</Text>
          
          <FormField
            title="Email"
            value={form.email}
            placeholder="example@gmail.com"
            handleChangeText={(e) => setForm({...form,email:e})}
            otherStyles="mt-5"
            
          />

          <FormField
            title="Username"
            value={form.username}
            placeholder="johndoe85"
            handleChangeText={(e) => setForm({...form,username:e})}
            otherStyles="mt-5"
            
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form,password:e})}
            otherStyles="mt-5"

          />


          <View className="flex justify-center w-full flex-col items-center">
            
            <Text className="mt-3 text-center font-psemibold text-gray-100">
              Have an Account? <Link className="text-amber-800" href="/sign-in">Sign in</Link>
            </Text>
            
            <CustomButton
              name="Sign Up"

              handlePress={() => {handleSubmit(form.username,form.email, form.password)}}
              ContainerStyles={"border-2 border-red-400 mt-4 mb-6 h-12 bg-amber-800 rounded-2xl text-white"}
              textStyles={"text-gray-300"}
              >
            </CustomButton>
            
            <ThirdPartyButton
              name="Sign Up with Google"
              handlePress={() => {
                console.log("Sign Up with Google")
              }}
              iconSource={icons.google_g_logo}
              ContainerStyles={"mt-4"}
              textStyles={"text-gray-300"}
              >
            </ThirdPartyButton>
            
            <ThirdPartyButton
              name="Sign Up with Outlook"
              handlePress={() => {
                console.log("Sign Up with Outlook")
              }}
              iconSource={icons.outlook_logo}
              ContainerStyles={"mt-5 "}
              textStyles={"text-gray-300"}
              >
            </ThirdPartyButton>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

