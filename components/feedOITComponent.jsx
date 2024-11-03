import React, { useState } from 'react';
import { YStack, XStack, Text, Button, Modal, Image, ScrollView, Pressable } from 'tamagui';
import { Ionicons } from '@expo/vector-icons'; // For the 3-dot icon

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
    <YStack
      backgroundColor="#E4D3BA"
      padding={15}
      marginVertical={10}
      borderRadius={10}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.8}
      shadowRadius={20}
      elevation={5}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width="90%"
      alignSelf="center"
    >
      <Pressable onPress={handleOpenModal} flex={1}>
        <YStack marginBottom={5} flexDirection="row" flexWrap="wrap">
          {tags.map((tag, index) => (
            <Button
              key={index}
              backgroundColor="#23603F"
              borderRadius={15}
              paddingHorizontal={10}
              paddingVertical={5}
              marginRight={5}
              marginBottom={5}
            >
              <Text fontSize={12} color="#fff">{tag}</Text>
            </Button>
          ))}
        </YStack>
        <YStack marginTop={5}>
          <Text fontSize={18} fontWeight="bold" width="100%" numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text marginTop={10} fontSize={14} color="#666">{preview}</Text>
        </YStack>
      </Pressable>

      {/* Three-dot menu button */}
      <Pressable onPress={handleToggleMenu} padding={5}>
        <Ionicons name="ellipsis-vertical" size={24} color="gray" />
      </Pressable>

      {/* Menu Modal */}
      {menuVisible && (
        <YStack
          position="absolute"
          right={20}
          top={40}
          backgroundColor="#fff"
          padding={10}
          borderRadius={10}
          elevation={10}
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.8}
          shadowRadius={20}
        >
          <Pressable onPress={handleSavePost}>
            <Text fontSize={16} color="#007BFF">Save Post</Text>
          </Pressable>
        </YStack>
      )}

      {/* Full content modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
        <YStack flex={1} justifyContent="center" backgroundColor="rgba(0, 0, 0, 0.5)">
          <YStack backgroundColor="#fff" padding={20} margin={20} borderRadius={10} maxHeight="80%">
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
              <Text fontSize={22} fontWeight="bold" marginBottom={15}>{title}</Text>
              
              {picture && (
                <Image
                  source={{ uri: picture }}
                  width="100%"
                  height={200}
                  marginBottom={15}
                  resizeMode="contain"
                />
              )}

              <Text fontSize={16} lineHeight={22}>{content}</Text>
            </ScrollView>
            <Button marginTop={20} padding={10} backgroundColor="#007BFF" borderRadius={5} alignItems="center" onPress={handleCloseModal}>
              <Text color="#fff" fontSize={16}>Close</Text>
            </Button>
          </YStack>
        </YStack>
      </Modal>
    </YStack>
  );
};

export default FeedOITComponent;
