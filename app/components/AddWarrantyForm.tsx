// components/AddWarrantyForm.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Circle } from 'react-native-svg';

interface AddWarrantyFormProps {
  onClose: () => void;
}

const AddWarrantyForm: React.FC<AddWarrantyFormProps> = ({ onClose }) => {
  const [productName, setProductName] = useState('');
  const [serviceCenter, setServiceCenter] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [store, setStore] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [notes, setNotes] = useState('');

  const validateDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const handleAddWarranty = () => {
    if (!validateDate(purchaseDate) || !validateDate(expirationDate)) {
      Alert.alert(
        'Invalid Date Format',
        'Please enter dates in YYYY-MM-DD format.'
      );
      return;
    }

    // Here you can handle the actual warranty addition logic (e.g., API call)

    Alert.alert('Success', 'Warranty added successfully!');
    onClose(); // Close the form modal after successful addition
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.formOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.formContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Ionicons name="close" size={24} color="#555" onPress={onClose} />
              <Text style={styles.headerTitle}>Add a Warranty</Text>
            </View>

            {/* Illustration */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/warranty-placeholder.png')} // Replace with your image path
                style={styles.image}
              />
            </View>

            {/* Input Fields */}
            <ScrollView style={styles.inputContainer} contentContainerStyle={{ paddingBottom: 20 }}>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  placeholder="Product Name"
                  value={productName}
                  onChangeText={setProductName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Service Center"
                  value={serviceCenter}
                  onChangeText={setServiceCenter}
                />
              </View>

              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  placeholder="Manufacturer"
                  value={manufacturer}
                  onChangeText={setManufacturer}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Store"
                  value={store}
                  onChangeText={setStore}
                />
              </View>

              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  placeholder="Model"
                  value={model}
                  onChangeText={setModel}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.row}>
                <TextInput
                  style={styles.dateInput}
                  placeholder="Purchase Date (YYYY-MM-DD)"
                  value={purchaseDate}
                  onChangeText={setPurchaseDate}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.dateInput}
                  placeholder="Expiration Date (YYYY-MM-DD)"
                  value={expirationDate}
                  onChangeText={setExpirationDate}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.row}>
                {/* Scan Receipt Button */}
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="scan-outline" size={24} color="#555" />
                  <Text style={styles.iconButtonText}>Scan Receipt</Text>
                </TouchableOpacity>

                {/* Add Receipt Button */}
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="add-outline" size={24} color="#555" />
                  <Text style={styles.iconButtonText}>Add Receipt</Text>
                </TouchableOpacity>

                {/* Add Files Button */}
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="document-attach-outline" size={24} color="#555" />
                  <Text style={styles.iconButtonText}>Add Files</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.notesInput}
                placeholder="Add notes"
                value={notes}
                onChangeText={setNotes}
                multiline
              />
            </ScrollView>

            {/* Add Warranty Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddWarranty}>
              <Text style={styles.addButtonText}>Add Warranty</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formOverlay: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  formContainer: {
    backgroundColor: '#D2BBA1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#555',
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    width: 100,
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 15,
    backgroundColor: '#FFF',
  },
  inputContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 5,
    fontSize: 14,
    color: '#333',
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 5,
    fontSize: 14,
    color: '#333',
  },
  iconButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 2,
  },
  iconButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  notesInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
    marginHorizontal: 5,
    minHeight: 80,
  },
  addButton: {
    backgroundColor: '#7E8FA6',
    borderRadius: 24,
    alignItems: 'center',
    padding: 12,
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddWarrantyForm;
