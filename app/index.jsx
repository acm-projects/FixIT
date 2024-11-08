import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, Dimensions } from 'react-native';
import { Link, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import CustomButton from "../components/CustomButton";
import { useState, useRef } from 'react';

// Import images
const OIT1 = require('../assets/images/OIT1.jpg');
const OIT2 = require('../assets/images/OIT2.jpg');
const OIT3 = require('../assets/images/OIT3.jpg');

const ONBOARDING_DATA = [
  {
    title: "Welcome to Fixit",
    description: "Your one-stop solution for home repairs and maintenance",
    image: OIT1
  },
  {
    title: "Find Trusted Professionals",
    description: "Connect with verified experts in your area",
    image: OIT2
  },
  {
    title: "Book and Track Services",
    description: "Schedule appointments and track progress in real-time",
    image: OIT3
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      
      {/* Logo Header */}
      <View style={{ 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 80, 
        backgroundColor: '#C084FC'
      }}>
        <Text style={{ 
          fontWeight: 'bold', 
          fontSize: 32, 
          color: 'white' 
        }}>
          Fixit
        </Text>
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
            style={{
              width: screenWidth,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 24
            }}
          >
            <Image
              source={slide.image}  // Changed to use local image
              style={{
                width: 288,
                height: 288,
                marginBottom: 32,
                borderRadius: 10  // Added border radius for better appearance
              }}
              resizeMode="cover"  // Changed to cover for better image display
            />
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#7C3AED',
              marginBottom: 16,
              textAlign: 'center'
            }}>
              {slide.title}
            </Text>
            <Text style={{
              fontSize: 18,
              color: '#4B5563',
              textAlign: 'center',
              marginBottom: 24
            }}>
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Navigation Dots */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 32 
      }}>
        {ONBOARDING_DATA.map((_, index) => (
          <View
            key={index}
            style={{
              height: 8,
              width: currentSlide === index ? 16 : 8,
              borderRadius: 4,
              backgroundColor: currentSlide === index ? '#7C3AED' : '#E9D5FF',
              marginHorizontal: 4
            }}
          />
        ))}
      </View>

      {/* Bottom Buttons */}
      <View style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 32,
        marginTop: 'auto'
      }}>
        <View style={{ width: 256 }}>
          <CustomButton
            name={currentSlide === ONBOARDING_DATA.length - 1 ? "Get Started" : "Next"}
            ContainerStyles={{
              backgroundColor: '#7C3AED',
              marginVertical: 12,
              width: '100%'
            }}
            TextStyles={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
            handlePress={handleNext}
          />
          
          <CustomButton
            name="Skip"
            ContainerStyles={{
              borderWidth: 2,
              borderColor: '#7C3AED',
              width: '100%'
            }}
            TextStyles={{
              color: '#7C3AED',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
            handlePress={handleSkip}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}