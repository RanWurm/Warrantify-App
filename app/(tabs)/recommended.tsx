// app/(tabs)/recommended.tsx
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Adjust the path if needed

// Recommended product structure
interface RecommendedProduct {
  title: string;
  iconName: string;
}

// Item component
const RecommendedItem = ({ title, iconName }: RecommendedProduct) => (
  <View style={styles.recommendedItem}>
    <MaterialCommunityIcons name={iconName as any} size={40} color="#4f3e2f" />
    <View style={styles.recommendedInfo}>
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
  </View>
);

const RecommendedPage = () => {
  const { userId } = useContext(UserContext); // get userId from context
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Adjust to your actual server or local IP
  const backendURL = 'http://10.0.0.5:5000';

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) {
        setRecommendedProducts([]);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${backendURL}/get_recommendation`, {
          params: { user_id: userId },
        });
        const rawRecs = response.data.recommendations || [];
        
        // Map the server data to your local structure
        const mappedRecs: RecommendedProduct[] = rawRecs.map((rec: any) => ({
          title: rec.brand ? `${rec.brand} ${rec.category_code.split('.').pop() || 'Product'}` : `Product ${rec.product_id}`,
          iconName: rec.iconName || 'cellphone', // Default to 'cellphone' if iconName is not provided
        }));

        setRecommendedProducts(mappedRecs);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to fetch recommended products. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  // Handle loading and error states
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4f3e2f" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Render recommended products from server
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
    paddingHorizontal: 10,
  },
  recommendedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d2c2', // Light border color
    backgroundColor: '#fff',
    borderRadius: 10,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default RecommendedPage;
