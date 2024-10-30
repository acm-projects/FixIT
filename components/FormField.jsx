import { View, Text, TextInput, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons } from "../constants"

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={[styles.formFieldContainer, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={[styles.inputContainer, title === "Password" && styles.passwordContainer]}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#F3F4F6"  // Adjust placeholder text color to match the design
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />

        {title === "Password" && 
        <Pressable onPressOut={() => { setShowPassword((prev) => !prev) }}>
          <Image style={styles.icon} source={!showPassword ? icons.eye : icons.eyeHide} />
        </Pressable>}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
  formFieldContainer: {
    marginBottom: 12,  // Tailwind "space-y-2" is applied as vertical margin
  },
  title: {
    color: '#FFFFFF',  // Tailwind "text-white"
    fontWeight: '500',  // Tailwind "font-pmedium"
    marginBottom: 8,  // Adding space between title and input
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: '#000',  // You can change this to whatever color you want
    width: '100%',
    height: 64,  // Tailwind "h-16"
    paddingHorizontal: 16,  // Tailwind "px-4"
    borderRadius: 16,  // Tailwind "rounded-2xl"
    backgroundColor: '#000000',  // Tailwind "bg-black-100"
    justifyContent: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',  // Tailwind "flex flex-row"
    alignItems: 'center',  // Tailwind "items-center"
  },
  textInput: {
    color: '#FFFFFF',  // Tailwind "text-white"
    flex: 1,  // Tailwind "flex-1"
    fontWeight: '600',  // Tailwind "font-psemibold"
    fontSize: 16,  // Tailwind "text-base"
  },
  icon: {
    height: 40,  // Tailwind "h-10"
    width: 40,  // Tailwind "w-10"
  },
});
