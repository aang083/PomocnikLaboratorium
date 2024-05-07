import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const LabConfigLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="labConfiguration" options={{headerShown: false}}/>
      </Stack>
      <StatusBar backgroundColor="#161622" style="light"/>
    </>
  )
}

export default LabConfigLayout