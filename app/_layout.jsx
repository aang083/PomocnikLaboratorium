import StartScreen from "./StartScreen";
// import ConfiScreen from "./modules/ConfiScreen";
// import GraduationScreen from "./modules/GraduationScreen";
// import SectionGraduationScreen from "./modules/SectionGraduationScreen";
import React from "react";
import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack>
      <StartScreen name="index" options={{headerShown: false}} />
      <StartScreen name="StartScreen" options={{headerShown: false}} />
    </Stack>
  );
}

export default AppLayout;