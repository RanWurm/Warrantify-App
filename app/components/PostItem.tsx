// PostItem.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../../constants/firebase';

const PostItem = ({ post }) => {
  const [authorData, setAuthorData] = useState(null);
  const [isReacted, setIsReacted] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', post.author));
        if (userDoc.exists()) {
          setAuthorData(userDoc.data());
        } else {
          setAuthorData(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch author data.');
      }
    };

    fetchAuthorData();
  }, [post.author]);

  const handleReaction = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Not Authenticated', 'Please log in to react to posts.');
      return;
    }

    try {
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        reactions: arrayUnion(user.uid),
      });
      setIsReacted(true);
    } catch (error) {
      console.error('Error adding reaction:', error);
      Alert.alert('Error', 'Failed to add reaction.');
    }
  };

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        {authorData && authorData.profilePicture ? (
          <Image source={{ uri: authorData.profilePicture }} style={styles.postProfilePic} />
        ) : (
          <View style={styles.postProfilePicPlaceholder}>
            <MaterialCommunityIcons name="account" size={24} color="#fff" />
          </View>
        )}
        <Text style={styles.author}>{authorData ? authorData.username : 'Unknown User'}</Text>
      </View>
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity
          style={[styles.reactButton, isReacted && styles.reactButtonActive]}
          onPress={handleReaction}
          disabled={isReacted}
        >
          <Text style={styles.reactButtonText}>{isReacted ? 'Joined' : 'Join'}</Text>
        </TouchableOpacity>
        <Text style={styles.reactionsCount}>
          {post.reactions.length || 0} {post.reactions.length === 1 ? 'reaction' : 'reactions'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postProfilePicPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    fontSize: 14,
    color: '#d1d1d6',
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reactButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#6a11cb',
    borderRadius: 8,
  },
  reactButtonActive: {
    backgroundColor: '#2575fc',
  },
  reactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  reactionsCount: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default PostItem;
