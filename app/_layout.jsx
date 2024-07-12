import React from "react";
import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="(labConfig)" options={{headerShown: false}} />
      <Stack.Screen name="(studentAssessment)" options={{headerShown: false}} />
      <Stack.Screen name="(studentRegister)" options={{headerShown: false}} />
    </Stack>
  );
}

export default AppLayout;