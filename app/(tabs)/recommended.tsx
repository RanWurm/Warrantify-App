import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';

const RecommendedItem = ({ title, description, iconName }) => (
  <View style={styles.recommendedItem}>
    <MaterialCommunityIcons name={iconName} size={40} color="#4f3e2f" />
    <View style={styles.recommendedInfo}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
    </View>
  </View>
);

const RecommendedPage = () => {
  const recommendedProducts = [
    {
      title: 'iPhone 15',
      description: 'Experience the latest from Apple',
      iconName: 'cellphone',
    },
    {
      title: 'MacBook Pro',
      description: 'Powerful and sleek for professionals',
      iconName: 'laptop-mac',
    },
    {
      title: 'Bose QC45 Headphones',
      description: 'Unmatched noise cancellation and comfort',
      iconName: 'headphones',
    },
    {
      title: 'Samsung Galaxy Tab S9',
      description: 'The ultimate Android tablet experience',
      iconName: 'tablet',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recommended Products</Text>
        <Text style={styles.headerSubText}>Curated just for you</Text>
      </View>

      <ScrollView style={styles.recommendedList}>
        {recommendedProducts.map((product, index) => (
          <RecommendedItem key={index} {...product} />
        ))}
      </ScrollView>

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5ede6', // Light beige background
  },
  header: {
    padding: 20,
    backgroundColor: '#efe1d1', // Soft beige for the header
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4f3e2f', // Dark brown text
  },
  headerSubText: {
    fontSize: 16,
    color: '#7a6858', // Medium brown text
    marginTop: 5,
  },
  recommendedList: {
    flex: 1,
  },
  recommendedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d2c2', // Light border color
  },
  recommendedInfo: {
    marginLeft: 15,
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f3e2f', // Dark brown text
  },
  itemDescription: {
    fontSize: 14,
    color: '#7a6858', // Medium brown text
    marginTop: 5,
  },
});

export default RecommendedPage;
