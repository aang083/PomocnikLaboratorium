import { View, Text, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "../../components/CustomButton";

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    IDPC:""
  });
  const generate = () => {

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex h-full px-2">
          <View className="w-full flex flex-row space-x-5">
            <Text className="flex text-2xl font-semibold text-white mt-5">
              ZAPIS STUDENTÓW
            </Text>
            <CustomButton title="Generuj listę" handlePress={generate} containerStyles="bg-quaternary"/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Registration