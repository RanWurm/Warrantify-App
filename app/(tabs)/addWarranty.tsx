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
import { Stack } from 'expo-router';

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
    <>
      {/* Remove the header */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 70 }}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Ionicons name="document-outline" size={70} color="#555" style={styles.headerIcon} />
            <Text style={styles.title}>Add a warranty</Text>
          </View>
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
      </ScrollView>

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
    </>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerIcon: {},
  title: {
    fontSize: 30,
    fontFamily: 'InriaSerif-Regular',
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
    marginLeft: 20,
    width: 390,
    height: 150,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },
  image: {
    width: 390,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: '#FFF',
    borderRadius: 15,
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
  notesInput: {
    flex: 100,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
    marginRight: 5,
    marginLeft: 5,
    minHeight: 80,
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
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    position: 'absolute',
    bottom: 0, // Ensure it's at the bottom of the screen
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#555',
  },
});
