// FeedPageScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavBar from '../components/BottomNavBar';
import {
  query,
  where,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import { auth, db } from '../../constants/firebase';
import PostItem from '../components/PostItem';

export default function FeedPageScreen() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch posts with real-time listener
  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('visibility', '==', 'everyone'),
      orderBy('dateCreated', 'desc'),
      limit(50) // Adjust as needed
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const postsData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setPosts(postsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    );

    // Add BackHandler listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    // Cleanup on unmount
    return () => {
      unsubscribe();
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    // Display a confirmation alert when the back button is pressed
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit the app?',
      [
        { text: 'Cancel', style: 'cancel' }, // Dismiss alert
        { text: 'Exit', onPress: () => BackHandler.exitApp() }, // Exit the app
      ],
      { cancelable: true }
    );

    return true; // Prevent the default back button behavior
  };

  const createPost = async (userId, content, visibility = 'everyone') => {
    await addDoc(collection(db, 'posts'), {
      author: userId,
      content,
      dateCreated: new Date().toISOString(),
      reactions: [], // Ensure consistency
      comments: [],
      visibility,
    });
  };

  const handlePost = async () => {
    if (newPost.trim().length === 0) return;

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Not Authenticated', 'Please log in to create a post.');
      return;
    }

    try {
      await createPost(user.uid, newPost, 'everyone');
      setNewPost('');
      // No need to manually load posts; onSnapshot handles it
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.newPostContainer}>
        <TextInput
          style={styles.newPostInput}
          placeholder="What are your plans tonight?"
          placeholderTextColor="#aaa"
          value={newPost}
          onChangeText={setNewPost}
        />
        <TouchableOpacity
          style={styles.postButton}
          onPress={handlePost}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            style={styles.postButtonGradient}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostItem post={item} />}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <BottomNavBar />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  newPostContainer: {
    backgroundColor: '#2a2a3c',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  newPostInput: {
    height: 50,
    backgroundColor: '#3a3a4f',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#555',
  },
  postButton: {
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
  },
  postButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
});
