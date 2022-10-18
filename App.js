import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import CameraScreen from './screens/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}
       options={{
        title: 'ReceiptScan+',
        headerStyle: {
          backgroundColor: '#151517',
        },
        headerTintColor: '#b1fab9',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 40},
        }}
      />
      <Stack.Screen 
        name="Settings" component={SettingsScreen}
        options={{
          title: 'ReceiptScan+',
          headerStyle: {
            backgroundColor: '#151517',
          },
          headerTintColor: '#b1fab9',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 40},
          }}
      />
        <Stack.Screen  name="Home" component={HomeScreen}
        options={{
          title: 'ReceiptScan+',
          headerStyle: {
            backgroundColor: '#151517',
          },
          headerTintColor: '#b1fab9',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 40},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
