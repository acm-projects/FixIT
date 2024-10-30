import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

const ProfilePage = () => {
  const navigation = useNavigation();
  
  // Default profile data (no useEffect, static state)
  const [profile] = useState({
    name: 'Nykaela Burks',
    email: 'nykaela.burks@example.com',
    major: 'Computer Science',
    classYear: 'Senior',
    profilePicture: 'https://via.placeholder.com/150',
    backgroundImage: 'https://via.placeholder.com/600x200',
  });

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={{ uri: profile.backgroundImage }} style={styles.backgroundImage} />

      {/* Profile Image */}
      <View style={styles.profileImageWrapper}>
        <Image source={{ uri: profile.profilePicture }} style={styles.profileImage} />
      </View>

      {/* User Info */}
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.email}>{profile.email}</Text>
      <Text style={styles.info}>Major: {profile.major}</Text>
      <Text style={styles.info}>Class Year: {profile.classYear}</Text>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('editProfile', {
            name: profile.name,
            email: profile.email,
            major: profile.major,
            classYear: profile.classYear,
            profilePicture: profile.profilePicture,
            backgroundImage: profile.backgroundImage,
          })
        }
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4D3BA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
});

export default ProfilePage;
