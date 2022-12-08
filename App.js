import { app } from "./services/firebase";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CameraScreen from "./screens/CameraScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ReceiptScreen from "./screens/ReceiptScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "ReceiptScan+",
              headerStyle: {
                backgroundColor: "#151517",
              },
              headerTintColor: "#b1fab9",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 40,
              },
            }}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{
              title: "ReceiptScan+ > History",
              headerStyle: {
                backgroundColor: "#151517",
              },
              headerTintColor: "#b1fab9",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 40,
              },
            }}
          />
          <Stack.Screen
            name="Receipt"
            component={ReceiptScreen}
            options={{
              title: "ReceiptScan+",
              headerStyle: {
                backgroundColor: "#151517",
              },
              headerTintColor: "#b1fab9",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 40,
              },
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: "ReceiptScan+",
              headerStyle: {
                backgroundColor: "#151517",
              },
              headerTintColor: "#b1fab9",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 40,
              },
            }}
          />
          <Stack.Screen
            name="Scan"
            component={CameraScreen}
            options={{
              title: "ReceiptScan+",
              headerStyle: {
                backgroundColor: "#151517",
              },
              headerTintColor: "#b1fab9",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 40,
              },
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "ReceiptScan+",
              headerStyle: {
                backgroundColor: "#151517",
              },
              headerTintColor: "#b1fab9",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 40,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
