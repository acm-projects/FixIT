import { StatusBar } from 'expo-status-bar';
import {  Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import CustomButton from "../components/CustomButton";
import { Dimensions } from 'react-native';


// Import images
const OIT1 = require('../assets/images/OIT1.jpg');
const OIT2 = require('../assets/images/OIT2.jpg');
const OIT3 = require('../assets/images/OIT3.jpg');

const { width: screenWidth } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    title: "Welcome to Fixit",
    description: "Your one-stop solution for IT repairs and maintenance",
    image: OIT1,
  },
  {
    title: "Find Trusted Professionals",
    description: "Connect with verified experts in your area",
    image: OIT2,
  },
  {
    title: "Book and Track Services",
    description: "Schedule appointments and track progress in real-time",
    image: OIT3,
  },
];

export default function App() {
  const scrollViewRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter(); // Changed to useRouter
  // Handle Scroll Event
  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentSlide(slideIndex);
  };

  // Handle Next Button Press
  const handleNext = () => {
    if (currentSlide < ONBOARDING_DATA.length - 1) {
      scrollViewRef.current.scrollTo({ x: (currentSlide + 1) * screenWidth, animated: true });
    } else {
      router.push('/home');
    }
  };

  // Handle Skip Button Press
  const handleSkip = () => {
    router.push('/home');
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
        backgroundColor: '#C084FC',
      }}>
        <Text style={{
          fontWeight: '600',
          fontSize: 32,
          color: 'white',
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
              paddingHorizontal: 24,
            }}
          >
            <Image
              source={slide.image}
              style={{
                width: 288,
                height: 288,
                marginBottom: 32,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#C084FC',
              marginBottom: 16,
              textAlign: 'center',
            }}>
              {slide.title}
            </Text>
            <Text style={{
              fontSize: 18,
              color: '#4B5563',
              textAlign: 'center',
              marginBottom: 24,
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
        marginTop: 32,
      }}>
        {ONBOARDING_DATA.map((_, index) => (
          <View
            key={index}
            style={{
              height: 8,
              width: currentSlide === index ? 16 : 8,
              borderRadius: 4,
              backgroundColor: currentSlide === index ? '#C084FC' : '#E9D5FF',
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>

      {/* Bottom Buttons */}
      <View style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 48,
        paddingHorizontal: 24,
        marginTop: 'auto',
        gap: 16,
      }}>
        <View style={{
          width: '100%',
          maxWidth: 320,
          gap: 12,
          alignItems: 'center',
        }}>
          <CustomButton
            name={currentSlide === ONBOARDING_DATA.length - 1 ? "Get Started" : "Next"}
            ContainerStyles={{
              backgroundColor: '#C084FC',
              borderRadius: 8,
              paddingVertical: 14,
              width: '80%',
              elevation: 2,
            }}
            TextStyles={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}
            handlePress={handleNext}
          />
          
          <CustomButton
            name="Skip"
            ContainerStyles={{
              borderWidth: 2,
              borderColor: '#C084FC',
              borderRadius: 8,
              paddingVertical: 14,
              width: '80%',
              backgroundColor: 'white',
            }}
            TextStyles={{
              color: '#C084FC',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}
            handlePress={handleSkip}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
