// app/context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';

interface UserContextProps {
  userId: number | null;
  assignUserId: (uid: string) => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
  userId: null,
  assignUserId: async () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);

  const USER_ID_KEY_PREFIX = 'user_id_';

  // Function to generate a random user_id between 1 and 33296
  const generateRandomUserId = (): number => {
    return Math.floor(Math.random() * 5000) + 1;
  };

  // Assign or retrieve user_id based on Firebase UID
  const assignUserId = async (uid: string) => {
    try {
      const storageKey = `${USER_ID_KEY_PREFIX}${uid}`;
      const storedUserId = await AsyncStorage.getItem(storageKey);

      if (storedUserId) {
        // `user_id` already assigned
        setUserId(parseInt(storedUserId, 10));
        console.log(`Existing user_id for UID ${uid}: ${storedUserId}`);
      } else {
        // Assign a new `user_id` randomly
        const newUserId = generateRandomUserId();
        await AsyncStorage.setItem(storageKey, newUserId.toString());
        setUserId(newUserId);
        console.log(`Assigned new user_id for UID ${uid}: ${newUserId}`);
      }
    } catch (error) {
      console.error('Error assigning user_id:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userId, assignUserId }}>
      {children}
    </UserContext.Provider>
  );
};
