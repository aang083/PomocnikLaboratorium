import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const AssassmentLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="assessment" options={{headerShown: false}}/>
        <Stack.Screen name="sectionAssassment" options={{headerShown: false}}/>
      </Stack>
      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default AssassmentLayout