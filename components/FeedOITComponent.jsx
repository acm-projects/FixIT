import React, { useState } from 'react';
import { ScrollView, Modal, View } from 'react-native';
import { Card, Text, Button, Image, Icon, Overlay } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; // Make sure you've imported your Tailwind instance

const FeedOITComponent = ({ title, tags, preview, content, picture }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const handleToggleMenu = () => setMenuVisible(!menuVisible);
  
  const handleSavePost = () => {
    setMenuVisible(false);
    alert('Post saved!');
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
        overlayStyle={tw`absolute right-5 top-10 w-auto p-2.5 rounded-lg`}
      >
        <Button
          title="Save Post"
          type="clear"
          onPress={handleSavePost}
          titleStyle={tw`text-blue-500`}
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
            buttonStyle={tw`bg-blue-500 rounded-md`}
          />
        </ScrollView>
      </Overlay>
    </Card>
  );
};

export default FeedOITComponent;