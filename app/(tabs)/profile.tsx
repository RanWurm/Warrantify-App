import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// WarrantyItem Component
const WarrantyItem = ({ title, subtitle, date, timeAgo, iconName }) => (
  <View style={styles.warrantyItem}>
    <MaterialCommunityIcons name={iconName} size={32} color="#7E8FA6" style={styles.icon} />
    <View style={styles.warrantyInfo}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.warrantyDates}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.timeAgoText}>{timeAgo}</Text>
    </View>
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
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>My Warranties</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile-picture.jpg')} // Replace with your image path
            style={styles.profileImage}
          />
          <View style={styles.progressTextContainer}>
            <Text style={styles.boldText}>30% Expired</Text>
            <Text style={styles.boldText}>65% In Progress</Text>
            <Text style={styles.boldText}>5% Recent</Text>
            <Text style={styles.subText}>My Ratings</Text>
            <View style={styles.ratingStars}>
              <MaterialCommunityIcons name="star" size={16} color="#C6A992" />
              <MaterialCommunityIcons name="star" size={16} color="#C6A992" />
              <MaterialCommunityIcons name="star" size={16} color="#C6A992" />
              <MaterialCommunityIcons name="star-outline" size={16} color="#C6A992" />
              <MaterialCommunityIcons name="star-outline" size={16} color="#C6A992" />
            </View>
          </View>
          <View style={styles.progressCircle}>
            <View style={styles.progressCircleInner}>
              <Text style={styles.progressCircleText}>65%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="tune" size={20} color="#000" />
          <Text style={styles.filterButtonText}>All Warranties</Text>
        </TouchableOpacity>
        <View style={styles.searchInput}>
          <TextInput
            placeholder="Search here"
            placeholderTextColor="#666"
            style={styles.searchText}
          />
          <MaterialCommunityIcons name="magnify" size={20} color="#666" />
        </View>
      </View>

      {/* Warranties List */}
      <ScrollView style={styles.warrantyList}>
        {warranties.map((warranty, index) => (
          <WarrantyItem key={index} {...warranty} />
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Add Warranty Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Warranty</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFE6',
  },
  header: {
    padding: 20,
    backgroundColor: '#F5EFE6',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  title: {
    fontSize: 35,
    fontFamily: 'InriaSerif-Bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
	marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EFE6',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    borderColor: '#7E8FA6',
    borderWidth: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  progressTextContainer: {
    flex: 1,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  boldText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
	fontFamily: 'InriaSerif-Regular',

  },
  subText: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
	fontFamily: 'InriaSerif-Regular',

  },
  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F5EFE6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#C6A992', // Nude color
    position: 'relative',
  },
  progressCircleInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
	fontFamily: 'InriaSerif-Regular',

  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D2BBA1',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 5,
	fontFamily: 'InriaSerif-Regular',

  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#D2BBA1',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
	fontFamily: 'InriaSerif-Regular',

  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    marginRight: 5,
	fontFamily: 'InriaSerif-Regular',

  },
  warrantyList: {
    flex: 1,
  },
  warrantyItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FDFDFD',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
    alignItems: 'center',
  },
  warrantyInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
	fontFamily: 'InriaSerif-Regular',

  },
  itemSubtitle: {
    color: '#666',
    marginTop: 5,
	fontFamily: 'InriaSerif-Regular',

  },
  warrantyDates: {
    alignItems: 'flex-end',
	fontFamily: 'InriaSerif-Regular',

  },
  dateText: {
    color: '#666',
	fontFamily: 'InriaSerif-Regular',

  },
  timeAgoText: {
    color: '#7E8FA6',
    fontSize: 12,
	fontFamily: 'InriaSerif-Regular',

  },
  bottomPadding: {
    height: 80,
  },
  addButton: {
    backgroundColor: '#7E8FA6',
    padding: 15,
    margin: 10,
    borderRadius: 24,
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    marginHorizontal: 20,
	
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
	fontFamily: 'InriaSerif-Regular',

  },
});

export default WarrantyProfile;
