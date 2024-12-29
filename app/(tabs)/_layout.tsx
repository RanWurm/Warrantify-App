import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1b1b1b' : '#F5F5F5',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#333',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="home"
        options={{
          title: 'Warrantify',
          headerLargeTitle: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerShadowVisible: false,
        }}
      />
      
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}