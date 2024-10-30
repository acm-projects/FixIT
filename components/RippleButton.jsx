import React, { useRef, useState } from 'react'
import { Text, Pressable, Animated } from 'react-native'
import { styled } from 'nativewind'
import {LinearGradient} from 'expo-linear-gradient'

const RippleButton = ({ title, onPress }) => {
  const rippleOpacity = useRef(new Animated.Value(0)).current
  const rippleScale = useRef(new Animated.Value(0)).current
  const [pressed, setPressed] = useState(false)
  
  const transform = () => {
    setPressed((prevVal) => !prevVal)
  }
  const handlePressIn = () => {

    rippleOpacity.setValue(0.5)
    rippleScale.setValue(0)

    // Start expanding the ripple
    Animated.parallel([
      Animated.timing(rippleScale, {
        toValue: 6,       // Controls the maximum scale of the ripple
        duration: 600,    // Duration of the expansion
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,       // Fades out during the ripple
        duration: 500,
        useNativeDriver: true,
      })
    ]).start()
  }

  return (
    <Pressable
      onPress={onPress}
      onPressOut={transform}
      onPressIn={() => {handlePressIn(), transform()}}
      className={`relative w-full mb-16 h-12 shadow-lg shadow-black rounded-lg justify-center items-center ${pressed ?"transform scale-95 duration-700 ease-in-out" : ""}`}
    >

      {/* Linear Gradient */}
      <LinearGradient
        colors={['#E4D3BA', '#797ee1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`flex-1 justify-center w-2/3 items-center rounded-lg`}
      >
        {/* Ripple Animation */}
        <Animated.View
            className="absolute bg-white opacity-30 w-12 h-12 rounded-full"
            style={{
            transform: [{ scale: rippleScale }],
            opacity: rippleOpacity,
            }}
        />

        <Text className="text-white text-lg font-semibold">{title}</Text>
      </LinearGradient>
      
    </Pressable>
  )
}

export default RippleButton
