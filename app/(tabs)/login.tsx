import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// 1) Import Firebase Auth functions
import { auth } from '../../constants/firebase';
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();

  // 2) Handle Login using Firebase Auth
  const handleLogin = async () => {
    try {
      // Attempt to sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // If successful, userCredential.user contains the user info
      console.log('User logged in:', userCredential.user.uid);

      // Navigate to home page or wherever you want
      router.push('/home');
    } catch (error) {
      // Catch and handle different auth errors
      if (error.code === 'auth/user-not-found') {
        alert('No user found with this email. Please register first.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email format. Please check and try again.');
      } else {
        alert('Login failed: ' + error.message);
      }
      console.error('Error signing in:', error);
    }
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/warrantylogo.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Warrantify</Text>
        <Text style={styles.subtitle}>
          Manage your product warranties all in one place.
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8898aa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8898aa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text style={styles.showPasswordText}>
              {isPasswordVisible ? 'Hide' : 'Show'} Password
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin} // Calls handleLogin on button press
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#dbc4b2', '#4f3e2f']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5ede6', // Light beige background
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 120,
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4f3e2f', // Dark brown text
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7a6858', // Medium brown text
    marginTop: 8,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  passwordContainer: {
    marginBottom: 24,
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1f36',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  showPasswordButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  showPasswordText: {
    color: '#4f3e2f', // Dark brown text
    fontSize: 14,
    fontWeight: '600',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#4f3e2f', // Dark brown text
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    color: '#7a6858', // Medium brown text
    fontSize: 14,
  },
  signupLink: {
    color: '#4f3e2f', // Dark brown text
    fontSize: 14,
    fontWeight: '600',
  },
});
