// myWarranties.tsx

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
import * as Progress from 'react-native-progress'; // Import progress library
import { Svg, Circle } from 'react-native-svg';
import BottomNavBar from '../components/BottomNavBar';
import AddWarrantyButton from '../components/AddWarrantyButton'; // Import the new component

// WarrantyItem Component
const WarrantyItem = ({ title, subtitle, date, timeAgo, iconName, progress }) => {
  // Determine the color of the progress bar based on progress level
  let progressColor = '#7E8FA6'; // Default color
  if (progress >= 0.75) {
    progressColor = '#AF6F6F'; // Red for low progress
  } else if (progress >= 0.5) {
    progressColor = '#FDCB6E'; // Yellow for medium progress
  } else {
    progressColor = '#B3D2A1'; // Green for high progress
  }

  return (
    <View style={styles.warrantyItem}>
      <MaterialCommunityIcons name={iconName} size={32} color="#000" style={styles.icon} />
      <View style={styles.warrantyInfo}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.warrantyProgress}>
        <View style={styles.dateRow}>
          <MaterialCommunityIcons name="calendar" size={16} color="#000" style={styles.iconSpacing} />
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <Progress.Bar
          progress={progress}
          width={150}
          color={progressColor}
          unfilledColor="#E8E8E8"
          borderWidth={0}
          height={8}
          style={styles.progressBar}
        />
        <View style={styles.timeRow}>
          <MaterialCommunityIcons name="clock-fast" size={16} color="#000" style={styles.iconSpacing} />
          <Text style={styles.timeAgoText}>{timeAgo}</Text>
        </View>
      </View>
    </View>
  );
};

const myWarranties = () => {
  const warranties = [
    {
      title: 'Ipad',
      subtitle: 'Apple 10 gen 10.9 inch',
      date: '14/05/2025',
      timeAgo: 'in 3 months',
      iconName: 'tablet',
      progress: 0.75, // 75% progress
    },
    {
      title: 'Headphones',
      subtitle: 'JBL 720BT',
      date: '16/08/2025',
      timeAgo: 'in 8 months',
      iconName: 'headphones',
      progress: 0.3, // 30% progress
    },
    {
      title: 'Earphones',
      subtitle: 'Apple Airpods gen 2',
      date: '04/02/2024',
      timeAgo: '1 year ago',
      iconName: 'earbuds',
      progress: 1.0, // Expired
    },
    {
      title: 'Laptop',
      subtitle: 'Lenovo yoga slim 7-15IMH',
      date: '25/05/2025',
      timeAgo: '5 months ago',
      iconName: 'laptop',
      progress: 0.50, // 50% progress
    },
    {
      title: 'Hair Dryer',
      subtitle: 'Dyson Air wrap',
      date: '20/01/2025',
      timeAgo: 'in one month',
      iconName: 'hair-dryer',
      progress: 0.90, // 90% progress
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
            <View style={styles.progressStats}>
              <View style={styles.progressStatItem}>
                <Text style={styles.boldPercentage}>30%</Text>
                <Text style={styles.statText}>Expired</Text>
              </View>
              <View style={styles.progressStatItem}>
                <Text style={styles.boldPercentage}>65%</Text>
                <Text style={styles.statText}>In Progress</Text>
              </View>
              <View style={styles.progressStatItem}>
                <Text style={styles.boldPercentage}>5%</Text>
                <Text style={styles.statText}>Recent</Text>
              </View>
            </View>
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
            <Svg width={70} height={70}>
              <Circle
                cx="35"
                cy="35"
                r="30"
                stroke="#E8E8E8"
                strokeWidth="6"
                fill="none"
              />
              <Circle
                cx="35"
                cy="35"
                r="30"
                stroke="#C6A992"
                strokeWidth="6"
                strokeDasharray="188"
                strokeDashoffset="47"
                strokeLinecap="round"
                fill="none"
                transform="rotate(-90, 35, 35)"
              />
            </Svg>
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
      <AddWarrantyButton />

      {/* Bottom Navigation */}
      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E0D4',
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
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  progressStatItem: {
    alignItems: 'center',
  },
  boldPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'InriaSerif-Bold',
  },
  subText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'InriaSerif-Bold',
  },
  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  progressCircle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleInner: {
    position: 'absolute',
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
  },
  warrantyProgress: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Space between the date row and progress bar
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // Space between the progress bar and time row
  },
  iconSpacing: {
    marginRight: 5, // Space between the icon and text
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'InriaSerif-Regular',
  },
  progressBar: {
    borderRadius: 5,
  },
  timeAgoText: {
    fontSize: 12,
    color: '#7E8FA6',
    fontFamily: 'InriaSerif-Regular',
  },
  bottomPadding: {
    height: 80,
  },
  addButton: {
    // Removed as we're using AddWarrantyButton
  },
  addButtonText: {
    // Removed as we're using AddWarrantyButton
  },
});

export default myWarranties;

