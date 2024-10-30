import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // For the 3-dot icon

const FeedOITComponent = ({ title, tags, preview, content, picture }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSavePost = () => {
    setMenuVisible(false);
    alert('Post saved!');
  };

  return (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={handleOpenModal} style={styles.postContent}>
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tagButton}>
              <Text style={styles.tagButtonText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.preview}>{preview}</Text>
        </View>
      </TouchableOpacity>

      {/* Three-dot menu button */}
      <TouchableOpacity onPress={handleToggleMenu} style={styles.menuButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="gray" />
      </TouchableOpacity>

      {/* Menu Modal */}
      {menuVisible && (
        <View style={styles.menuModal}>
          <TouchableOpacity onPress={handleSavePost}>
            <Text style={styles.menuText}>Save Post</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Full content modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.modalTitle}>{title}</Text>
              
              {/* Conditional rendering for the picture */}
              {picture && (
                <Image
                  source={{ uri: picture }}  // Assuming picture is a URL. Adjust if it's a local asset.
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              )}

              <Text style={styles.modalBody}>{content}</Text>
            </ScrollView>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#E4D3BA',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  postContent: {
    flex: 1,
  },
  tagsContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButton: {
    backgroundColor: '#23603F',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  tagButtonText: {
    fontSize: 12,
    color: '#fff',
  },
  infoContainer: {
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
  },
  preview: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  menuButton: {
    padding: 5,
  },
  menuModal: {
    position: 'absolute',
    right: 20,
    top: 40,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#007BFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalBody: {
    fontSize: 16,
    lineHeight: 22,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FeedOITComponent;
