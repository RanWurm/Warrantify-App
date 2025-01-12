import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddWarranty() {
  const [productName, setProductName] = useState('');
  const [serviceCenter, setServiceCenter] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [store, setStore] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons name="document-outline" size={50} color="#555" />
        <Text style={styles.title}>Add a warranty</Text>
        <Text style={styles.subtitle}>
          Keep track of all of your receipts simply and easily!
        </Text>
      </View>

      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/warranty-placeholder.png')} // Replace with your image path
          style={styles.image}
        />
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
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
            style={styles.input}
            placeholder="Purchase date"
            value={purchaseDate}
            onChangeText={setPurchaseDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiration date"
            value={expirationDate}
            onChangeText={setExpirationDate}
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="scan-outline" size={24} color="#555" />
            <Text style={styles.iconButtonText}>Scan Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add-outline" size={24} color="#555" />
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
      </View>

      {/* Add Warranty Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Warranty</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="construct-outline" size={24} color="#555" />
          <Text style={styles.navText}>Service centers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="heart-outline" size={24} color="#555" />
          <Text style={styles.navText}>Recommended</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="layers-outline" size={24} color="#555" />
          <Text style={styles.navText}>My Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home-outline" size={24} color="#555" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2BBA1',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'InriaSerif-Bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'InriaSerif-Regular',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  inputContainer: {
    paddingHorizontal: 16,
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
  iconButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
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
    marginTop: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#7E8FA6',
    borderRadius: 24,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#555',
  },
});
