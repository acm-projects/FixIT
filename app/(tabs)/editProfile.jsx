import React, { useState, useContext } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { ProfileContext } from './ProfileContext'; // Import ProfileContext

const EditProfilePage = () => {
  const navigation = useNavigation();
  const { profile, setProfile } = useContext(ProfileContext); // Access profile data from context

  // State variables for profile fields, initialized from context
  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [major, setMajor] = useState(profile.major || '');
  const [classYear, setClassYear] = useState(profile.classYear || '');
  const [profileImg, setProfileImg] = useState(profile.profilePicture || '');
  const [bgImg, setBgImg] = useState(profile.backgroundImage || '');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false); // To know which image is being edited (profile or background)

  // Function to save changes and update profile in context
  const handleSave = () => {
    const updatedProfile = {
      name,
      email,
      major,
      classYear,
      profilePicture: profileImg,
      backgroundImage: bgImg,
    };

    setProfile(updatedProfile); // Update profile data in context
    navigation.goBack(); // Navigate back to ProfilePage
  };

  // Request permission to access the device's media library
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
    }
  };

  // Function to open the image picker for selecting images
  const chooseFromDevice = async () => {
    await requestPermission(); // Ensure permission is granted

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (isEditingProfileImage) {
        setProfileImg(result.uri);  // Set selected profile image
      } else {
        setBgImg(result.uri);  // Set selected background image
      }
    }

    setIsModalVisible(false); // Close the modal after selection
  };

  // Function to handle which image is being edited
  const handleEditImage = (isProfileImage) => {
    setIsEditingProfileImage(isProfileImage);
    setIsModalVisible(true); // Show the modal
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Show current background image */}
      <Image source={{ uri: bgImg }} style={styles.imagePreview} />
      <TouchableOpacity style={styles.imageEditButton} onPress={() => handleEditImage(false)}>
        <Text style={styles.imageEditButtonText}>Edit Background Image</Text>
      </TouchableOpacity>

      {/* Show current profile image */}
      <Image source={{ uri: profileImg }} style={styles.imagePreview} />
      <TouchableOpacity style={styles.imageEditButton} onPress={() => handleEditImage(true)}>
        <Text style={styles.imageEditButtonText}>Edit Profile Image</Text>
      </TouchableOpacity>

      {/* Edit Name */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      
      {/* Edit Email */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      
      {/* Edit Major */}
      <TextInput
        style={styles.input}
        value={major}
        onChangeText={setMajor}
        placeholder="Major"
      />
      
      {/* Edit Class Year */}
      <TextInput
        style={styles.input}
        value={classYear}
        onChangeText={setClassYear}
        placeholder="Class Year"
      />

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      {/* Modal for choosing image source */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Choose image source:</Text>
            <Button title="Choose from Device" onPress={chooseFromDevice} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4D3BA',
  },
  contentContainer: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#23603F',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  imageEditButton: {
    backgroundColor: '#B1A180',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  imageEditButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#23603F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
});

export default EditProfilePage;
