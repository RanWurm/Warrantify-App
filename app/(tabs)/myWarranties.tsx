// app/screens/myWarranties.tsx
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { Svg, Circle } from 'react-native-svg';
import BottomNavBar from '../components/BottomNavBar';
import AddWarrantyButton from '../components/AddWarrantyButton';
import { UserContext } from '../context/UserContext'; // Adjust the path as needed
import axios from 'axios';

interface WarrantyItemProps {
  title: string;
  subtitle: string;
  date: string;
  timeAgo: string;
  iconName: string;
  progress: number;
}

const WarrantyItem: React.FC<WarrantyItemProps> = ({ title, subtitle, date, timeAgo, iconName, progress }) => {
  let progressColor = '#7E8FA6';
  if (progress >= 65) {
    progressColor = '#AF6F6F';
  } else if (progress >= 40) {
    progressColor = '#FDCB6E';
  } else {
    progressColor = '#B3D2A1';
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

const MyWarranties = () => {
  const { userId } = useContext(UserContext);
  const [warranties, setWarranties] = useState<WarrantyItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWarranties = async () => {
      console.log(userId)
      if (userId) {
        try {
          // Update the backendURL to match your Flask server
          const backendURL = 'http://10.0.0.5:5000/get_warranties';
          console.log('Fetching warranties for user:', userId);
          console.log('Backend URL:', backendURL);
          
          const response = await axios.get(backendURL, {
            params: { user_id: userId },
            timeout: 5000, // 5 second timeout
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          });
          
          console.log('Response received:', response.data);
          setWarranties(response.data.warranties);
          setLoading(false);
        } catch (err: any) {
          console.error('Detailed error:', {
            message: err.message,
            code: err.code,
            response: err.response,
            config: err.config
          });
          setError(`Failed to fetch warranties: ${err.message}`);
          setLoading(false);
        }
      }
    };

    fetchWarranties();
  }, [userId]);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Warranties</Text>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={require('../../assets/images/profile-picture.jpg')}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.progressTextContainer}>
            <View style={styles.progressStats}>
              <View style={styles.progressStatItem}>
                <Text style={styles.boldPercentage}>30%</Text>
                <Text style={styles.statText}>Expired</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.progressStatItem}>
                <Text style={styles.boldPercentage}>65%</Text>
                <Text style={styles.statText}>In Progress</Text>
              </View>
              <View style={styles.divider} />
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
          <View style={styles.progressCircleContainer}>
            <View style={styles.progressCircle}>
              <Svg width={60} height={60}>
                <Circle
                  cx="30"
                  cy="30"
                  r="25"
                  stroke="#E8E8E8"
                  strokeWidth="6"
                  fill="none"
                />
                <Circle
                  cx="30"
                  cy="30"
                  r="25"
                  stroke="#C6A992"
                  strokeWidth="6"
                  strokeDasharray="157"
                  strokeDashoffset="55"
                  strokeLinecap="round"
                  fill="none"
                  transform="rotate(-90, 30, 30)"
                />
              </Svg>
              <View style={styles.progressCircleInner}>
                <Text style={styles.progressCircleText}>65%</Text>
              </View>
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
    padding: 15,
    backgroundColor: '#F5EFE6',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  title: {
    fontSize: 32,
    fontFamily: 'InriaSerif-Bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 5,
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
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5EFE6',
    padding: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#7E8FA6',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  progressTextContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#DDD',
    marginHorizontal: 5,
  },
  boldPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  statText: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'InriaSerif-Bold',
  },
  subText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'InriaSerif-Bold',
    textAlign: 'center',
    marginTop: 5,
  },
  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  progressCircle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleContainer: {
    width: 60,
    marginLeft: 10,
  },
  progressCircleInner: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleText: {
    fontSize: 14,
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
    marginBottom: 5,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  iconSpacing: {
    marginRight: 5,
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

export default MyWarranties;