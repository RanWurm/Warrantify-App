import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WarrantyItem = ({ title, subtitle, date, timeAgo, iconName }) => (
  <View style={styles.warrantyItem}>
    <View style={styles.warrantyInfo}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.warrantyDates}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.timeAgoText}>{timeAgo}</Text>
    </View>
    <MaterialCommunityIcons name={iconName} size={24} color="#666" />
  </View>
);

const WarrantyProfile = () => {
  const warranties = [
    {
      title: 'Ipad',
      subtitle: 'Apple 10 gen 10.9 inch',
      date: '14/05/2025',
      timeAgo: 'in 3 months',
      iconName: 'tablet',
    },
    {
      title: 'Headphones',
      subtitle: 'JBL 720BT',
      date: '16/08/2025',
      timeAgo: 'in 9 months',
      iconName: 'headphones',
    },
    {
      title: 'Earphones',
      subtitle: 'Apple Airpods gen 2',
      date: '04/02/2024',
      timeAgo: '1 year ago',
      iconName: 'earbuds',
    },
    {
      title: 'Laptop',
      subtitle: 'Lenovo yoga slim 7-15IMH',
      date: '25/05/2025',
      timeAgo: '5 months ago',
      iconName: 'laptop',
    },
    {
      title: 'Hair Dryer',
      subtitle: 'Dyson Air wrap',
      date: '20/01/2025',
      timeAgo: 'in one month',
      iconName: 'hair-dryer',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profilePicPlaceholder} />
        <View style={styles.ratings}>
          <Text style={styles.ratingText}>My Ratings</Text>
          <View style={styles.ratingBars}>
            <Text>30% Expired</Text>
            <Text>65% In progress</Text>
            <Text>5% Recent</Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>65%</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="filter-variant" size={20} color="#666" />
          <Text>All Warranties</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <MaterialCommunityIcons name="magnify" size={20} color="#666" />
          <Text>Search here</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.warrantyList}>
        {warranties.map((warranty, index) => (
          <WarrantyItem key={index} {...warranty} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Warranty</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="wrench" size={24} color="#666" />
          <Text>Service centers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="heart" size={24} color="#666" />
          <Text>Recommended</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="view-dashboard" size={24} color="#666" />
          <Text>My Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="home" size={24} color="#666" />
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5ede6', // Light beige background
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#efe1d1', // Soft beige for the header
    borderRadius: 15,
    margin: 10,
  },
  profilePicPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#dbc4b2', // Light brown for profile placeholder
  },
  ratings: {
    flex: 1,
    marginLeft: 15,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f3e2f', // Dark brown text
  },
  ratingBars: {
    marginTop: 10,
  },
  progressCircle: {
    position: 'absolute',
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#dbc4b2', // Light brown circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4f3e2f', // Dark brown text
  },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#efe1d1', // Beige button background
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  searchButton: {
    backgroundColor: '#efe1d1', // Beige button background
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  warrantyList: {
    flex: 1,
  },
  warrantyItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d2c2', // Light border color
    alignItems: 'center',
  },
  warrantyInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4f3e2f', // Dark brown text
  },
  itemSubtitle: {
    color: '#7a6858', // Medium brown subtitle
    marginTop: 5,
  },
  warrantyDates: {
    marginRight: 10,
    alignItems: 'flex-end',
  },
  dateText: {
    color: '#7a6858', // Medium brown text
  },
  timeAgoText: {
    color: '#a89784', // Soft brown
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#dbc4b2', // Light brown button
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#4f3e2f', // Dark brown text
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0d2c2', // Light border color
  },
  navItem: {
    alignItems: 'center',
  },
});

export default WarrantyProfile;