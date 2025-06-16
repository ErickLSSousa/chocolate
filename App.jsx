import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/details';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Tela Principal', headerStyle: { backgroundColor: '#007bff' },
            headerTintColor: '#fff'
          }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Detalhes', headerStyle: { backgroundColor: '#dc3545' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile', headerStyle: { backgroundColor: '#17a2b8' },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

