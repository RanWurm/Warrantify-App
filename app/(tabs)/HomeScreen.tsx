import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const categories = [
    { id: '1', name: 'Computer', icon: 'desktop-outline' },
    { id: '2', name: 'Laptop', icon: 'laptop-outline' },
    { id: '3', name: 'Smartphone', icon: 'phone-portrait-outline' },
    { id: '4', name: 'Television', icon: 'tv-outline' },
    { id: '5', name: 'Printer', icon: 'print-outline' },
    { id: '6', name: 'Charger', icon: 'battery-charging-outline' },
    { id: '7', name: 'Refrigerator', icon: 'snow-outline' },
    { id: '8', name: 'Microwave', icon: 'restaurant-outline' },
    { id: '9', name: 'Washer', icon: 'water-outline' },
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.category}>
      <Ionicons name={item.icon} size={36} color="#333" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warrantify</Text>
      <Text style={styles.subtitle}>Warranty Management App</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={renderCategory}
        contentContainerStyle={styles.grid}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Warranty</Text>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D2BBA1', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  grid: { alignItems: 'center' },
  category: { alignItems: 'center', margin: 10, width: 80, height: 100 },
  categoryText: { marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' },
  addButton: { marginTop: 20, backgroundColor: '#0077E6', padding: 12, borderRadius: 8, alignItems: 'center', width: '80%' },
  addButtonText: { color: '#fff', fontSize: 16 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', backgroundColor: '#fff', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
  navButton: { alignItems: 'center' },
  navText: { fontSize: 12, color: '#555' },
  categoryContainer: {
    margin: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#E8E8E8', // Light gray
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E8E8E8',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
}
);

