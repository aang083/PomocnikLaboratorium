import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RegisterLayout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen name="registration" options={{headerShown: false}}/>
        </Stack>
        <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default RegisterLayout