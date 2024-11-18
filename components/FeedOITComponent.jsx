import React, { useState } from 'react';
import { ScrollView, Modal, View } from 'react-native';
import { Card, Text, Button, Image, Icon, Overlay } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import {useProfile} from '../app/ProfileContext';

import tw from 'twrnc';

const FeedOITComponent = ({ title, tags, preview, content, picture }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { savedPosts, setSavedPosts } = useProfile();

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const handleToggleMenu = () => setMenuVisible(!menuVisible);
  
  const handleSavePost = () => {
    const newPost = {
      title,
      tags,
      preview,
      content,
      picture,
      savedAt: new Date().toISOString(),
    };

    // Check if post is already saved
    const isAlreadySaved = savedPosts.some(post => post.title === title);

    if (!isAlreadySaved) {
      setSavedPosts(prevPosts => [...prevPosts, newPost]);
      alert('Post saved successfully!');
    } else {
      alert('This post is already saved!');
    }
    
    setMenuVisible(false);
  };

  return (
    
    <Card
      containerStyle={tw`bg-[#E4D3BA] rounded-lg w-[90%] self-center p-4 my-2.5 shadow-lg`}
    >
      <View style={tw`flex-row justify-between`}>
        <View style={tw`flex-1`}>
          <Button
            onPress={handleOpenModal}
            type="clear"
            containerStyle={tw`p-0`}
          >
            <View>
              <View style={tw`flex-row flex-wrap mb-1.5`}>
                {tags.map((tag, index) => (
                  <Button
                    key={index}
                    title={tag}
                    buttonStyle={tw`bg-[#23603F] rounded-full px-2.5 py-1.5 mr-1.5 mb-1.5`}
                    titleStyle={tw`text-xs text-white`}
                  />
                ))}
              </View>
              
              <Text 
                h4 
                style={tw`font-bold`}
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                {title}
              </Text>
              <Text style={tw`mt-2.5 text-gray-600`}>
                {preview}
              </Text>
            </View>
          </Button>
        </View>

        <Button
          onPress={handleToggleMenu}
          type="clear"
          icon={
            <Icon
              type="ionicon"
              name="ellipsis-vertical"
              size={24}
              color="gray"
            />
          }
        />
      </View>

      <Overlay
        isVisible={menuVisible}
        onBackdropPress={() => setMenuVisible(false)}
        overlayStyle={tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto p-2.5 rounded-lg`}
      >
        <Button
          title="Save Post"
          type="clear"
          onPress={handleSavePost}
          icon={
            <Icon
              name="bookmark-outline"
              type="ionicon"
              size={20}
              color="#23603F"
              style={tw`mr-2`}
            />
          }
          titleStyle={tw`text-[#23603F]`}
        />
      </Overlay>

      <Overlay
        isVisible={modalVisible}
        onBackdropPress={handleCloseModal}
        overlayStyle={tw`w-[90%] max-h-[80%] rounded-lg p-5`}
      >
        <ScrollView>
          <Text h3 style={tw`mb-4 text-center font-bold`}>
            {title}
          </Text>
          
          {picture && (
            <Image
              source={{ uri: picture }}
              style={tw`w-full h-50 mb-4`}
              resizeMode="contain"
            />
          )}

          <Text style={tw`text-base leading-6`}>
            {content}
          </Text>

          <Button
            title="Close"
            onPress={handleCloseModal}
            containerStyle={tw`mt-5`}
            buttonStyle={tw`bg-[#23603F] rounded-md`}
          />
        </ScrollView>
      </Overlay>
    </Card>
    
  );
};

export default FeedOITComponent;