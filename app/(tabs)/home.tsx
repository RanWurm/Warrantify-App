import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function home() {
  const [fontsLoaded] = useFonts({
    'InriaSerif-Regular': require('../../assets/fonts/InriaSerif-Regular.ttf'),
    'InriaSerif-Bold': require('../../assets/fonts/InriaSerif-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Render nothing while fonts are loading
  }

  return (
    <>
      {/* Disable the default header */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        {/* Logo */}
        <Image source={require('../../assets/images/warrantylogo.png')} style={styles.logo} />

        {/* Title and Subtitle */}
        <Text style={styles.title}>Warrantify</Text>
        <Text style={styles.subtitle}>Warranty Management App</Text>

        {/* Grid of Categories */}
        <FlatList
          data={[
            { id: '1', name: 'Computer', icon: 'desktop-outline' },
            { id: '2', name: 'Laptop', icon: 'laptop-outline' },
            { id: '3', name: 'Smartphone', icon: 'phone-portrait-outline' },
            { id: '4', name: 'Television', icon: 'tv-outline' },
            { id: '5', name: 'Printer', icon: 'print-outline' },
            { id: '6', name: 'Charger', icon: 'battery-charging-outline' },
            { id: '7', name: 'Refrigerator', icon: 'snow-outline' },
            { id: '8', name: 'Microwave', icon: 'restaurant-outline' },
            { id: '9', name: 'Washer', icon: 'water-outline' },
          ]}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.categoryContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={36} color="#000" />
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{item.name}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.grid}
        />

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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2BBA1',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
	marginTop:40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'InriaSerif-Bold',
    marginTop: 0,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
    fontFamily: 'InriaSerif-Regular',
  },
  grid: {
    alignItems: 'center',
    paddingBottom: 100,
	marginTop: 20,
  },
  categoryContainer: {
    margin: 20,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#E8E8E8',
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
    fontFamily: 'InriaSerif-Bold',
    color: '#000',
  },
  addButton: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    backgroundColor: '#7E8FA6',
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
    width: '80%',
	marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#D2BBA1',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    position: 'absolute',
    bottom: 0,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#555',
  },
});
