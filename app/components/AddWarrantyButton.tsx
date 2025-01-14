// components/AddWarrantyButton.tsx

import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Modal, 
  View, 
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddWarrantyForm from './AddWarrantyForm'; // Ensure this path is correct

const AddWarrantyButton = () => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const { width, height } = Dimensions.get('window');

  const openOptions = () => {
    setOptionsVisible(true);
  };

  const closeOptions = () => {
    setOptionsVisible(false);
  };

  const handleScanReceipt = () => {
    // Placeholder for scan functionality
    // Currently does nothing
    closeOptions();
  };

  const handleAddManually = () => {
    setOptionsVisible(false);
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  // Dynamic styles based on screen width
  const dynamicStyles = StyleSheet.create({
    addButton: {
      position: 'absolute',
      bottom: height * 0.1, // 10% from the bottom
      alignSelf: 'center',
      backgroundColor: '#7E8FA6',
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: height * 0.02, // 2% of screen height
      paddingHorizontal: width * 0.1, // 10% of screen width
      width: width * 0.8, // 80% of screen width
      // Optional: Add shadow for better visibility
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    addButtonText: {
      color: '#fff',
      fontSize: width * 0.05, // 5% of screen width
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: '#000000AA',
    },
    modalContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      padding: 20,
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalContent: {
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#DDD',
    },
    optionText: {
      fontSize: 16,
      marginLeft: 10,
      color: '#555',
    },
    cancelButton: {
      marginTop: 10,
      paddingVertical: 10,
    },
    cancelText: {
      fontSize: 16,
      color: '#7E8FA6',
    },
  });

  return (
    <>
      {/* Add Warranty Button */}
      <TouchableOpacity style={dynamicStyles.addButton} onPress={openOptions}>
        <Text style={dynamicStyles.addButtonText}>Add Warranty</Text>
      </TouchableOpacity>

      {/* Options Modal */}
      <Modal
        transparent
        visible={optionsVisible}
        animationType="fade"
        onRequestClose={closeOptions}
      >
        <TouchableWithoutFeedback onPress={closeOptions}>
          <View style={dynamicStyles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={dynamicStyles.modalContainer}>
          <View style={dynamicStyles.modalContent}>
            <Text style={dynamicStyles.modalTitle}>Add Warranty</Text>
            <TouchableOpacity style={dynamicStyles.optionButton} onPress={handleScanReceipt}>
              <Ionicons name="scan-outline" size={24} color="#555" />
              <Text style={dynamicStyles.optionText}>Scan Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dynamicStyles.optionButton} onPress={handleAddManually}>
              <Ionicons name="create-outline" size={24} color="#555" />
              <Text style={dynamicStyles.optionText}>Add Manually</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dynamicStyles.cancelButton} onPress={closeOptions}>
              <Text style={dynamicStyles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Warranty Form Modal */}
      <Modal
        transparent
        visible={formVisible}
        animationType="slide"
        onRequestClose={closeForm}
      >
        <AddWarrantyForm onClose={closeForm} />
      </Modal>
    </>
  );
};

export default AddWarrantyButton;
