import React, { useContext } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Button, Card } from '@rneui/themed';
import { useProfile } from './ProfileContext';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

const ProfilePage = () => {
  const router = useRouter();
  const { profile, savedPosts } = useProfile();

  return (
    <ScrollView style={tw`flex-1 bg-[#E4D3BA] p-5`}>
      {/* Profile Info Section */}
      <Card containerStyle={tw`bg-transparent border-0 p-0 m-0`}>
        <Image 
          source={{ uri: profile.backgroundImage }} 
          style={tw`w-full h-50 rounded-lg`} 
        />
        
        {/* Profile Image Container */}
        <View style={tw`items-center -mt-[75px]`}>
          <View style={tw`rounded-full overflow-hidden border-2 border-white`}>
            <Image 
              source={{ uri: profile.profilePicture }} 
              style={tw`w-[150px] h-[150px]`}
            />
          </View>
        </View>

        {/* Profile Info */}
        <View style={tw`items-center`}>
          <Text style={tw`text-2xl font-bold text-[#23603F] mt-2.5`}>
            {profile.name}
          </Text>
          <Text style={tw`text-base text-gray-500 mb-2.5`}>
            {profile.email}
          </Text>
          <Text style={tw`text-base text-[#23603F] mb-2.5`}>
            Major: {profile.major}
          </Text>
          <Text style={tw`text-base text-[#23603F] mb-2.5`}>
            Class Year: {profile.classYear}
          </Text>

          <Button
            title="Edit Profile"
            onPress={() => router.push('/editProfile')}
            buttonStyle={tw`bg-[#23603F] py-2.5 px-5 rounded-full mt-5`}
            titleStyle={tw`text-base font-bold`}
          />
        </View>
      </Card>

      {/* Saved Posts Section */}
      <View style={tw`mt-5`}>
        <Text style={tw`text-lg font-bold text-[#23603F] mb-2.5`}>
          Saved Posts
        </Text>
        
        {savedPosts.map((post, index) => (
          <Card
            key={index}
            containerStyle={tw`bg-white rounded-lg mb-2.5 p-2.5`}
          >
            <Text style={tw`text-base font-bold text-gray-800`}>
              {post.title}
            </Text>
            <Text style={tw`text-sm text-gray-500`}>
              Tags: {post.tags.join(', ')}
            </Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfilePage;