import React from "react";
import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="labConfiguration" options={{headerShown: false}}/>
      <Stack.Screen name="assessment" options={{headerShown: false}}/>
      <Stack.Screen name="sectionAssassment" options={{headerShown: false}}/>
      <Stack.Screen name="registration" options={{headerShown: false}} />
    </Stack>
  );
}

export default AppLayout;