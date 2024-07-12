import React from "react";
import { Stack } from "expo-router";
import { StudentProvider } from "../context/StudentContext";

const AppLayout = () => {
  return (
    <StudentProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="(labConfig)" options={{headerShown: false}} />
        <Stack.Screen name="(studentAssessment)" options={{headerShown: false}} />
        <Stack.Screen name="(studentRegister)" options={{headerShown: false}} />
      </Stack>
    </StudentProvider>
  );
}

export default AppLayout;
