import React, { useContext } from 'react';
import { YStack, XStack, ScrollView, Text, Button, Image } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from './ProfileContext';

const ProfilePage = () => {
  const navigation = useNavigation();
  const { profile, savedPosts } = useContext(ProfileContext);

  return (
    <ScrollView flex={1} backgroundColor="#E4D3BA" padding={20}>
      {/* Profile Info Section */}
      <YStack alignItems="center" marginBottom={20}>
        <Image source={{ uri: profile.backgroundImage }} width="100%" height={200} resizeMode="cover" />
        
        <YStack marginTop={-75} borderRadius={75} overflow="hidden" borderWidth={2} borderColor="#fff">
          <Image source={{ uri: profile.profilePicture }} width={150} height={150} />
        </YStack>

        <Text fontSize={24} fontWeight="bold" color="#23603F" marginTop={10}>
          {profile.name}
        </Text>
        <Text fontSize={16} color="#888" marginBottom={10}>
          {profile.email}
        </Text>
        <Text fontSize={16} color="#23603F" marginBottom={10}>
          Major: {profile.major}
        </Text>
        <Text fontSize={16} color="#23603F" marginBottom={10}>
          Class Year: {profile.classYear}
        </Text>

        <Button
          backgroundColor="#23603F"
          paddingVertical={10}
          paddingHorizontal={20}
          borderRadius={20}
          marginTop={20}
          onPress={() => navigation.navigate('editProfile')}
        >
          <Text color="#fff" fontSize={16} fontWeight="bold">Edit Profile</Text>
        </Button>
      </YStack>

      {/* Saved Posts Section */}
      <YStack marginTop={20}>
        <Text fontSize={18} fontWeight="bold" color="#23603F" marginBottom={10}>
          Saved Posts
        </Text>
        {savedPosts.map((post, index) => (
          <YStack key={index} backgroundColor="#fff" padding={10} borderRadius={10} marginBottom={10}>
            <Text fontSize={16} fontWeight="bold" color="#333">
              {post.title}
            </Text>
            <Text fontSize={14} color="#888">
              Tags: {post.tags.join(', ')}
            </Text>
          </YStack>
        ))}
      </YStack>
    </ScrollView>
  );
};

export default ProfilePage;
