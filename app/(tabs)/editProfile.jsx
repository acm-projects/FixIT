import React, { useState, useContext } from 'react';
import { ScrollView, YStack, Text, Input, Button, Image, Modal, Pressable } from 'tamagui';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { ProfileContext } from './ProfileContext'; // Import ProfileContext

const EditProfilePage = () => {
  const navigation = useNavigation();
  const { profile, setProfile } = useContext(ProfileContext);

  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [major, setMajor] = useState(profile.major || '');
  const [classYear, setClassYear] = useState(profile.classYear || '');
  const [profileImg, setProfileImg] = useState(profile.profilePicture || '');
  const [bgImg, setBgImg] = useState(profile.backgroundImage || '');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);

  const handleSave = () => {
    const updatedProfile = {
      name,
      email,
      major,
      classYear,
      profilePicture: profileImg,
      backgroundImage: bgImg,
    };

    setProfile(updatedProfile);
    navigation.goBack();
  };

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
    }
  };

  const chooseFromDevice = async () => {
    await requestPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (isEditingProfileImage) {
        setProfileImg(result.uri);
      } else {
        setBgImg(result.uri);
      }
    }

    setIsModalVisible(false);
  };

  const handleEditImage = (isProfileImage) => {
    setIsEditingProfileImage(isProfileImage);
    setIsModalVisible(true);
  };

  return (
    <ScrollView flex={1} backgroundColor="#E4D3BA" padding={20} justifyContent="center">
      <Text fontSize={24} fontWeight="bold" marginBottom={20} textAlign="center" color="#23603F">
        Edit Profile
      </Text>

      <Image source={{ uri: bgImg }} width={150} height={150} borderRadius={75} marginBottom={20} />
      <Button backgroundColor="#B1A180" paddingVertical={10} paddingHorizontal={20} borderRadius={10} marginBottom={20} onPress={() => handleEditImage(false)}>
        <Text color="#fff" fontSize={16} fontWeight="bold">Edit Background Image</Text>
      </Button>

      <Image source={{ uri: profileImg }} width={150} height={150} borderRadius={75} marginBottom={20} />
      <Button backgroundColor="#B1A180" paddingVertical={10} paddingHorizontal={20} borderRadius={10} marginBottom={20} onPress={() => handleEditImage(true)}>
        <Text color="#fff" fontSize={16} fontWeight="bold">Edit Profile Image</Text>
      </Button>

      <Input value={name} onChangeText={setName} placeholder="Name" height={50} borderColor="#ccc" borderWidth={1} borderRadius={10} paddingHorizontal={15} marginBottom={20} backgroundColor="#fff" />
      <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" height={50} borderColor="#ccc" borderWidth={1} borderRadius={10} paddingHorizontal={15} marginBottom={20} backgroundColor="#fff" />
      <Input value={major} onChangeText={setMajor} placeholder="Major" height={50} borderColor="#ccc" borderWidth={1} borderRadius={10} paddingHorizontal={15} marginBottom={20} backgroundColor="#fff" />
      <Input value={classYear} onChangeText={setClassYear} placeholder="Class Year" height={50} borderColor="#ccc" borderWidth={1} borderRadius={10} paddingHorizontal={15} marginBottom={20} backgroundColor="#fff" />

      <Button backgroundColor="#23603F" paddingVertical={15} borderRadius={10} alignItems="center" onPress={handleSave}>
        <Text color="#fff" fontSize={16} fontWeight="bold">Save Changes</Text>
      </Button>

      <Modal transparent animationType="slide" visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="rgba(0, 0, 0, 0.5)">
          <YStack width={300} backgroundColor="#fff" padding={20} borderRadius={10} alignItems="center">
            <Text fontSize={18} marginBottom={20}>Choose image source:</Text>
            <Button onPress={chooseFromDevice}>Choose from Device</Button>
            <Button onPress={() => setIsModalVisible(false)}>Cancel</Button>
          </YStack>
        </YStack>
      </Modal>
    </ScrollView>
  );
};

export default EditProfilePage;
