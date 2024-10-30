import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import ThirdPartyButton from '../../components/ThirdPartyButton';
import { icons } from "../../constants";

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Sign Up</Text>

          {/* Use ThirdPartyButton without passing any custom styles */}
          <ThirdPartyButton
            name="Sign Up with Google"
            handlePress={() => console.log("Sign Up with Google")}
            iconSource={icons.google_g_logo}
          />

          <ThirdPartyButton
            name="Sign Up with Outlook"
            handlePress={() => console.log("Sign Up with Outlook")}
            iconSource={icons.outlook_logo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
