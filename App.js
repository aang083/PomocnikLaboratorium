import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./modules/StartScreen";
import ConfiScreen from "./modules/ConfiScreen";
import GraduationScreen from "./modules/GraduationScreen";
import SectionGraduationScreen from "./modules/SectionGraduationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen name="Zapis studentów" component={StartScreen} />
          <Stack.Screen
            name="Konfiguracja laboratorium"
            component={ConfiScreen}
          />
          <Stack.Screen name="Ocenianie" component={GraduationScreen} />
          <Stack.Screen
            name="Ocenianie sekcji"
            component={SectionGraduationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
