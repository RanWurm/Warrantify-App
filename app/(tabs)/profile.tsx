import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';

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
  const [isModalVisible, setModalVisible] = useState(false);


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

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.profilePicPlaceholder} />
          <View style={styles.ratings}>
            <Text style={styles.ratingText}>My Ratings</Text>
            <View style={styles.ratingBars}>
              <Text style={styles.ratingPercentage}>30% Expired</Text>
              <Text style={styles.ratingPercentage}>65% In Progress</Text>
              <Text style={styles.ratingPercentage}>5% Recent</Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressText}>65%</Text>
            </View>
          </View>
        </View>

        <View style={styles.searchBar}>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="filter-variant" size={20} color="#fff" />
            <Text style={styles.buttonText}>All Warranties</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.warrantyList}>
          {warranties.map((warranty, index) => (
            <WarrantyItem key={index} {...warranty} />
          ))}
          <View style={styles.bottomPadding} />
        </ScrollView>

        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Text style={styles.addButtonText}>Add Warranty</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Warranty</Text>
            <TouchableOpacity style={styles.modalOption} onPress={toggleModal}>
              <MaterialCommunityIcons name="camera" size={24} color="#fff" />
              <Text style={styles.modalOptionText}>Use Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={toggleModal}>
              <MaterialCommunityIcons name="file-document-edit" size={24} color="#fff" />
              <Text style={styles.modalOptionText}>Fill Manually</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNavBar />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2BBA1',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#E8E8E8',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
  },
  profilePicPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7E8FA6',
  },
  ratings: {
    marginLeft: 15,
    flex: 1,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingBars: {
    marginTop: 10,
  },
  ratingPercentage: {
    fontSize: 14,
    color: '#666',
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7E8FA6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#7E8FA6',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    backgroundColor: '#7E8FA6',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  warrantyList: {
    flex: 1,
  },
  warrantyItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#E8E8E8',
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
  },
  itemSubtitle: {
    color: '#666',
    marginTop: 5,
  },
  warrantyDates: {
    alignItems: 'flex-end',
  },
  dateText: {
    color: '#666',
  },
  timeAgoText: {
    color: '#7E8FA6',
    fontSize: 12,
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#E8E8E8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#7E8FA6',
    borderRadius: 10,
    width: '100%',
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#D2BBA1',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default WarrantyProfile;