# Warrantify 📱

**Your Digital Warranty Management Solution**

Warrantify is a comprehensive mobile application that helps users manage, track, and organize their product warranties in one convenient place. Built with React Native and Expo, it provides a seamless experience across iOS, Android, and web platforms.

<img width="926" height="622" alt="image" src="https://github.com/user-attachments/assets/b293f918-e9d5-4b1d-95d8-6bbea9e78257" />
<img width="926" height="622" alt="image" src="https://github.com/user-attachments/assets/8ccfe714-1a26-4db0-af0f-8be2a8c62be1" />


## 🌟 Features

### 📋 Core Functionality
- **Warranty Management**: Add, edit, and track warranties for various products
- **Product Categories**: Support for computers, laptops, smartphones, TVs, printers, chargers, refrigerators, microwaves, and more
- **Expiration Tracking**: Get notified before warranties expire
- **Document Storage**: Store warranty documents and receipts securely
- **Service Center Locator**: Find nearby authorized service centers

### 🛍️ Shopping & Recommendations
- **Ad Board**: Browse deals and warranty offers from retailers
- **Product Recommendations**: Get personalized product suggestions
- **Price Tracking**: Monitor product prices and warranty costs

### 🔧 Technical Features
- **Cross-Platform**: Works on iOS, Android, and Web
- **Offline Support**: Cache data for offline access
- **Push Notifications**: Stay updated on warranty status
- **Location Services**: Find nearby service centers
- **Camera Integration**: Scan QR codes and capture documents
- **Secure Storage**: Encrypted local data storage

### 👤 User Experience
- **User Authentication**: Secure login and registration
- **Profile Management**: Personalize your experience
- **Settings & Preferences**: Customize notification preferences
- **Help & Support**: Built-in support system

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/warrantify.git
   cd warrantify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PYTHON_BACKEND_URL=your_python_backend_url
   SERVER_BACKEND_URL=your_server_backend_url
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

### Running the App

- **iOS**: Press `i` in the terminal or scan the QR code with the Expo Go app
- **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app
- **Web**: Press `w` in the terminal to open in your browser

## 🏗️ Project Structure

```
warrantify/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── components/        # Reusable UI components
│   └── context/          # React context providers
├── assets/               # Images, fonts, and static files
├── backend/              # Backend services
│   ├── node-server/      # Node.js backend
│   ├── python-server/    # Python backend
│   └── gate-way-server/  # API gateway
├── components/           # Shared components
├── constants/           # App constants and configuration
├── hooks/              # Custom React hooks
├── services/           # API and cache services
└── scripts/            # Build and utility scripts
```

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **React Native Paper** - Material Design components
- **Expo Router** - File-based routing

### Backend
- **Node.js** - JavaScript runtime
- **Python** - Backend services
- **Firebase** - Authentication and cloud services
- **Axios** - HTTP client

### Key Libraries
- **@react-native-async-storage/async-storage** - Local data storage
- **expo-camera** - Camera functionality
- **expo-location** - Location services
- **expo-notifications** - Push notifications
- **react-native-chart-kit** - Data visualization
- **react-leaflet** - Maps integration

## 📱 Screenshots

*[Add screenshots of your app here]*

## 🔧 Configuration

### Environment Variables
- `PYTHON_BACKEND_URL`: URL for Python backend services
- `SERVER_BACKEND_URL`: URL for Node.js backend services
- `GOOGLE_MAPS_API_KEY`: Google Maps API key for location services

### App Configuration
The app configuration is managed in `app.config.js` and includes:
- App metadata (name, version, slug)
- Platform-specific settings
- Plugin configurations
- Environment variables

## 🚀 Deployment

### Building for Production

1. **Configure EAS Build**
   ```bash
   npx eas build:configure
   ```

2. **Build for platforms**
   ```bash
   # iOS
   npx eas build --platform ios
   
   # Android
   npx eas build --platform android
   ```

3. **Submit to app stores**
   ```bash
   # iOS App Store
   npx eas submit --platform ios
   
   # Google Play Store
   npx eas submit --platform android
   ```

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons from [Expo Vector Icons](https://expo.github.io/vector-icons/)
- Maps powered by [Leaflet](https://leafletjs.com/)
- Charts by [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)

---

**Made with ❤️ by the Warrantify Team**
