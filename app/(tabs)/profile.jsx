import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from './ProfileContext';

const ProfilePage = () => {
  const navigation = useNavigation();
  const { profile, savedPosts } = useContext(ProfileContext);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Info Section */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: profile.backgroundImage }} style={styles.backgroundImage} />
        <View style={styles.profileImageWrapper}>
          <Image source={{ uri: profile.profilePicture }} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <Text style={styles.info}>Major: {profile.major}</Text>
        <Text style={styles.info}>Class Year: {profile.classYear}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('editProfile')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Saved Posts Section */}
      <View style={styles.savedPostsContainer}>
        <Text style={styles.savedPostsTitle}>Saved Posts</Text>
        {savedPosts.map((post, index) => (
          <View key={index} style={styles.postItem}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postTags}>Tags: {post.tags.join(', ')}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4D3BA',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  profileImageWrapper: {
    marginTop: -75,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#23603F',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#23603F',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#23603F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedPostsContainer: {
    marginTop: 20,
  },
  savedPostsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#23603F',
    marginBottom: 10,
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postTags: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProfilePage;
