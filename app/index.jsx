import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, Dimensions } from 'react-native';
import { Link, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import CustomButton from "../components/CustomButton";
import { useState, useRef } from 'react';

const ONBOARDING_DATA = [
  {
    title: "Welcome to Fixit",
    description: "Your one-stop solution for home repairs and maintenance",
    image: "/api/placeholder/300/300" // Replace with your actual image
  },
  {
    title: "Find Trusted Professionals",
    description: "Connect with verified experts in your area",
    image: "/api/placeholder/300/300" // Replace with your actual image
  },
  {
    title: "Book and Track Services",
    description: "Schedule appointments and track progress in real-time",
    image: "/api/placeholder/300/300" // Replace with your actual image
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / screenWidth);
    setCurrentSlide(currentIndex);
  };

  const renderDots = () => {
    return (
      <View className="flex-row justify-center items-center mt-8">
        {ONBOARDING_DATA.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              currentSlide === index ? 'bg-purple-600 w-4' : 'bg-purple-300'
            }`}
          />
        ))}
      </View>
    );
  };

  const handleSkip = () => {
    router.push('/home');
  };

  const handleNext = () => {
    if (currentSlide < ONBOARDING_DATA.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: screenWidth * (currentSlide + 1),
        animated: true
      });
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/sign-up');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Logo Header */}
      <View className="w-full justify-center items-center h-20 bg-purple-400">
        <Text className="font-bold text-4xl text-white">Fixit</Text>
      </View>

      {/* Onboarding Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {ONBOARDING_DATA.map((slide, index) => (
          <View
            key={index}
            style={{ width: screenWidth }}
            className="justify-center items-center px-6"
          >
            <Image
              source={{ uri: slide.image }}
              className="w-72 h-72 mb-8"
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-purple-800 mb-4 text-center">
              {slide.title}
            </Text>
            <Text className="text-lg text-gray-600 text-center mb-6">
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Navigation Dots */}
      {renderDots()}

      {/* Bottom Buttons */}
      <View className="px-6 pb-8 mt-auto">
        <CustomButton
          name={currentSlide === ONBOARDING_DATA.length - 1 ? "Get Started" : "Next"}
          ContainerStyles="bg-purple-600 my-3"
          TextStyles="text-white font-bold"
          handlePress={handleNext}
        />
        
        <CustomButton
          name="Skip"
          ContainerStyles="border-2 border-purple-600"
          TextStyles="text-purple-600 font-bold"
          handlePress={handleSkip}
        />
      </View>
    </SafeAreaView>
  );
}