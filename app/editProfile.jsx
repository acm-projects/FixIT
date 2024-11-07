import React, { useState, useContext } from 'react';
import { ScrollView, View, Modal, Image } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router'; // Changed from useNavigation
import { ProfileContext } from './ProfileContext';
import tw from 'twrnc';

const EditProfilePage = () => {
  const router = useRouter(); // Changed to useRouter
  const { profile, setProfile } = useContext(ProfileContext);

  // State management
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
    router.back(); // Changed from navigation.goBack()
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
        setProfileImg(result.assets[0].uri);
      } else {
        setBgImg(result.assets[0].uri);
      }
    }

    setIsModalVisible(false);
  };

  const handleEditImage = (isProfileImage) => {
    setIsEditingProfileImage(isProfileImage);
    setIsModalVisible(true);
  };

  return (
    <ScrollView style={tw`flex-1 bg-[#E4D3BA]`}>
      <View style={tw`p-5`}>
        <Text h4 style={tw`text-center text-[#23603F] mb-5`}>
          Edit Profile
        </Text>

        {/* Background Image */}
        <Image 
          source={{ uri: bgImg }} 
          style={tw`w-[150px] h-[150px] rounded-full mb-5 self-center bg-gray-200`}
        />
        <Button
          title="Edit Background Image"
          onPress={() => handleEditImage(false)}
          buttonStyle={tw`bg-[#B1A180] rounded-lg mb-5`}
        />

        {/* Profile Image */}
        <Image 
          source={{ uri: profileImg }} 
          style={tw`w-[150px] h-[150px] rounded-full mb-5 self-center bg-gray-200`}
        />
        <Button
          title="Edit Profile Image"
          onPress={() => handleEditImage(true)}
          buttonStyle={tw`bg-[#B1A180] rounded-lg mb-5`}
        />

        {/* Input Fields */}
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Name"
          containerStyle={tw`mb-2`}
          inputContainerStyle={tw`bg-white rounded-lg px-4 border border-gray-300`}
        />

        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          containerStyle={tw`mb-2`}
          inputContainerStyle={tw`bg-white rounded-lg px-4 border border-gray-300`}
        />

        <Input
          value={major}
          onChangeText={setMajor}
          placeholder="Major"
          containerStyle={tw`mb-2`}
          inputContainerStyle={tw`bg-white rounded-lg px-4 border border-gray-300`}
        />

        <Input
          value={classYear}
          onChangeText={setClassYear}
          placeholder="Class Year"
          containerStyle={tw`mb-5`}
          inputContainerStyle={tw`bg-white rounded-lg px-4 border border-gray-300`}
        />

        {/* Save Button */}
        <Button
          title="Save Changes"
          onPress={handleSave}
          buttonStyle={tw`bg-[#23603F] py-4 rounded-lg`}
          titleStyle={tw`font-bold`}
        />

        {/* Image Selection Modal */}
        <Modal
          transparent
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black/50`}>
            <View style={tw`bg-white p-5 rounded-lg w-[300px]`}>
              <Text style={tw`text-lg text-center mb-5`}>
                Choose image source:
              </Text>
              
              <Button
                title="Choose from Device"
                onPress={chooseFromDevice}
                buttonStyle={tw`bg-[#23603F] mb-2 rounded-lg`}
              />
              
              <Button
                title="Cancel"
                onPress={() => setIsModalVisible(false)}
                type="outline"
                buttonStyle={tw`border-[#23603F] rounded-lg`}
                titleStyle={tw`text-[#23603F]`}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default EditProfilePage;