import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { Link, SplashScreen, useFonts } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import CustomButton from "../components/CustomButton"


export default function App() {
  return (
    <>
    <View className="w-full justify-center items-center min-h-[15vh] px-4 bg-purple-400">
      <Text className="pt-5 font-bold text-4xl">Fixit</Text>
    </View>
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="h-full flex justify-center items-center gap-5 bg-purple-100">

        <CustomButton
           ContainerStyles="my-5 border-solid border-2"
           name="Log in" 
           handlePress={()=>{router.push('/sign-in')}}
           />
           
        <CustomButton 
        name="Sign Up"  
        ContainerStyles="my-5 border-solid border-2" 
        handlePress={()=>{router.push('/sign-up')}}
        /> 

        <CustomButton 
        name="Home"  
        ContainerStyles="my-5 border-solid border-2" 
        handlePress={()=>{router.push('/home')}}
        /> 

       {/* <CustomButton
          name="New Sign in"
          styles="my-5 border-solid border-2"
          handlePress={()=>{router.push('/sign-in')}}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

