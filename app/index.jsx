import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import {Link} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    
      <SafeAreaView className="bg-primary h-full">
        <View className="w-full justify-center items-center h-full px-4">
          <Text>Hey</Text>
          <Link href="/home">Going to home</Link>
        </View>
      </SafeAreaView>
      
    
  );
}

