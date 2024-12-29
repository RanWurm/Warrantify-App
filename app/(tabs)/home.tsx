import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const warranties = [
    {
      id: '1',
      product: 'Samsung TV',
      expiryDate: '2025-06-10',
      purchaseDate: '2023-06-10',
      status: 'active',
    },
    {
      id: '2',
      product: 'Sony Headphones',
      expiryDate: '2024-12-01',
      purchaseDate: '2023-12-01',
      status: 'expiring',
    },
    {
      id: '3',
      product: 'Apple Watch',
      expiryDate: '2024-03-15',
      purchaseDate: '2023-03-15',
      status: 'expired',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return ['#34D399', '#10B981'];
      case 'expiring':
        return ['#FBBF24', '#F59E0B'];
      case 'expired':
        return ['#EF4444', '#DC2626'];
      default:
        return ['#9CA3AF', '#6B7280'];
    }
  };

  const fetchAutocomplete = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/autocomplete?query=${input}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  };

  const handleInputChange = (text: string) => {
    setQuery(text);
    fetchAutocomplete(text);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const renderWarrantyItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.warrantyCard}>
        <View style={styles.warrantyHeader}>
          <Text style={styles.warrantyProduct}>{item.product}</Text>
          <LinearGradient
            colors={getStatusColor(item.status)}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.statusBadge}
          >
            <Text style={styles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </LinearGradient>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Purchase Date</Text>
            <Text style={styles.dateValue}>{item.purchaseDate}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Expiry Date</Text>
            <Text style={styles.dateValue}>{item.expiryDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#ffffff', '#f0f8ff']} style={styles.gradient}>
      <Stack.Screen
        options={{
          title: 'My Warranties',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerShadowVisible: false,
          headerLargeTitle: true,
        }}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a product..."
            placeholderTextColor="#999"
            value={query}
            onChangeText={handleInputChange}
          />
          {query.length > 0 && (
            <TouchableOpacity 
              onPress={() => {
                setQuery('');
                setSuggestions([]);
              }}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.suggestionItem}
                  onPress={() => handleSuggestionPress(item)}
                >
                  <Ionicons name="search-outline" size={16} color="#666" style={styles.suggestionIcon} />
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          </View>
        )}
      </View>

      {/* Warranty List */}
      <FlatList
        data={warranties}
        keyExtractor={(item) => item.id}
        renderItem={renderWarrantyItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#1B98F5', '#0077E6']}
          style={styles.fabGradient}
        >
          <Text style={styles.fabText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  suggestionsList: {
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  warrantyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  warrantyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  warrantyProduct: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1f36',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#8898aa',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    color: '#1a1f36',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  suggestionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});
