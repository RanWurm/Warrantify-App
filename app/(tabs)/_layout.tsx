// app/(tabs)/_layout.tsx
import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#1e1e2f', // Consistent dark theme for the header
          shadowColor: 'transparent', // Remove shadow for a cleaner look
        },
        headerTintColor: '#ffffff', // White text/icons for contrast
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackTitleVisible: false, // Cleaner navigation without back title
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerStyle: { backgroundColor: '#4a90e2' }, // Specific style for Home
          headerLeft: null, // Remove back button for the root screen
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: false, // Hides the header for Login screen
        }}
      />
      <Stack.Screen
        name="myWarranties"
        options={{
          title: 'My Warranties',
          headerStyle: { backgroundColor: '#5856d6' }, // Unique color for My Warranties
          headerLeft: null,
          headerShown: false, // Disable back button for My Warranties
        }}
      />
      <Stack.Screen
        name="recommended"
        options={{
          title: 'recommended',
          headerStyle: { backgroundColor: '#5856d6' }, // Unique color for My Warranties
          headerLeft: null,
          headerShown: false, // Disable back button for My Warranties
        }}
      />
      
    </Stack>
  );
}
