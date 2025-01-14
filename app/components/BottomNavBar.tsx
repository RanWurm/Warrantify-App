import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { signOut } from "firebase/auth";
import { auth } from "../../constants/firebase.js";

const BottomNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (route) => {
    if (pathname === route) return;
    router.push(route);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been logged out successfully.");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Logout Failed", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => navigateTo('/')}
      >
        <MaterialCommunityIcons
          name="home"
          size={24}
          color={pathname === '/' ? '#7E8FA6' : '#555'}
        />
        <Text style={[
          styles.navText,
          pathname === '/' && styles.activeNavText
        ]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigateTo('/recommended')}
      >
        <MaterialCommunityIcons
          name="heart"
          size={24}
          color={pathname === '/recommended' ? '#7E8FA6' : '#555'}
        />
        <Text style={[
          styles.navText,
          pathname === '/recommended' && styles.activeNavText
        ]}>
          Recommended
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigateTo('/myWarranties')}
      >
        <MaterialCommunityIcons
          name="account"
          size={24}
          color={pathname === '/myWarranties' ? '#7E8FA6' : '#555'}
        />
        <Text style={[
          styles.navText,
          pathname === '/myWarranties' && styles.activeNavText
        ]}>
          My Warranties
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={handleLogout}
      >
        <MaterialCommunityIcons
          name="logout"
          size={24}
          color={pathname === '/login' ? '#7E8FA6' : '#555'}
        />
        <Text style={[
          styles.navText,
          pathname === '/login' && styles.activeNavText
        ]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#E9E0D4',
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

export default BottomNavBar;
