// app/(tabs)/recommended.tsx
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Adjust the path if needed

// (1) Our recommended item structure
interface RecommendedProduct {
  title: string;
  iconName: string;
}

// (2) The item component
const RecommendedItem = ({ title, iconName }: RecommendedProduct) => (
  <View style={styles.recommendedItem}>
    <MaterialCommunityIcons name={iconName} size={40} color="#4f3e2f" />
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

  // (3) Adjust to your actual server or local IP
  const backendURL = 'http://10.0.0.5:5000';

  useEffect(() => {
    // (4) If we have a userId, fetch recommendations
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
        // Response shape: { recommendations: [ { product_id, category_code, brand, ...}, ... ] }
        // Map the server data to your local structure
        const rawRecs = response.data.recommendations || [];
        
        // (5) Convert the raw data from the backend to the structure we need for rendering
        const mappedRecs = rawRecs.map((rec: any) => {
          // Example logic:
          //   - Use the brand or product_id as the title
          //   - Derive an iconName from category_code or your own rules
          const categoryCode = rec.category_code || '';
          const lastWord = categoryCode.split('.').pop() || 'device';

          // Simple fallback icon logic:
          let derivedIconName = 'cellphone';
          if (lastWord.includes('headphone')) derivedIconName = 'headphones';
          else if (lastWord.includes('tablet')) derivedIconName = 'tablet';
          else if (lastWord.includes('telephone')) derivedIconName = 'cellphone';
          // Add more mapping if needed

          return {
            title: rec.brand ? rec.brand + ' ' + lastWord : 'Product ' + rec.product_id,
            iconName: derivedIconName,
          };
        });

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

  // (6) Handle loading and error states
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

  // (7) Render recommended products from server
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
