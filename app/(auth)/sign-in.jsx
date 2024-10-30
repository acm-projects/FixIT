import { StyleSheet, ScrollView, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import ThirdPartyButton from '../../components/ThirdPartyButton'
import { icons } from "../../constants"

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>FIXIT</Text>
          <Text style={styles.subTitle}>Log in to Fixit</Text>

          <FormField
            title="Username"
            value={form.username}
            placeholder="johndoe85"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={styles.formFieldMargin}   // Updated here to pass React Native style object
          />
          
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formFieldMargin}   // Updated here as well
          />

          <View style={styles.centerContent}>
            <Text style={styles.signUpText}>
              Don't have an Account? <Link style={styles.link} href="/sign-up">Sign up</Link>
            </Text>

            <CustomButton
              name="Sign In"
              handlePress={() => {
                console.log(form)
                setForm({ username: '', password: '' })
              }}
              ContainerStyles={styles.signInButton}
              textStyles={styles.signInButtonText}
            />

            <ThirdPartyButton
              name="Sign In with Google"
              handlePress={() => {
                console.log("Sign In with Google")
              }}
              iconSource={icons.google_g_logo}
              ContainerStyles={styles.thirdPartyButton}
              textStyles={styles.thirdPartyButtonText}
            />

            <ThirdPartyButton
              name="Sign In with Outlook"
              handlePress={() => {
                console.log("Sign In with Outlook")
              }}
              iconSource={icons.outlook_logo}
              ContainerStyles={styles.thirdPartyButtonMargin}
              textStyles={styles.thirdPartyButtonText}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#007BFF',
    height: '100%',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
    height: '100%',
    paddingHorizontal: 16,
  },
  title: {
    color: '#F3F4F6',
    fontSize: 40,
    marginTop: 20,
  },
  subTitle: {
    color: '#F3F4F6',
    fontWeight: '600',
    fontSize: 20,
    marginTop: 20,
  },
  formFieldMargin: {
    marginTop: 28,  // Equivalent to Tailwind "mt-7"
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  signUpText: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: '#F3F4F6',
  },
  link: {
    color: '#D97706',
  },
  signInButton: {
    borderWidth: 2,
    borderColor: '#F87171',
    marginTop: 32,
    marginBottom: 24,
    height: 48,
    backgroundColor: '#D97706',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#F3F4F6',
  },
  thirdPartyButton: {
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdPartyButtonMargin: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdPartyButtonText: {
    color: '#F3F4F6',
  },
});
