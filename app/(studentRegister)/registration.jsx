import { View, Text, ScrollView, VirtualizedList, Alert } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "../../components/CustomButton";
import Tile from "../../components/Tile";
import FormField from "../../components/FormField";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "sectionList";

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    IDPC:""
  });

  const [savedStudents, setSavedStudents] = useState([]);

  const generate = () => {

  }

  const handleDelete = () =>{

  }

  const renderItem = ({item}) => {
    <Tile 
      name={item.name}
      surname={item.surname}
      IDPC={item.IDPC}
      onRemove={handleDelete}
    />
  }
  const formSubmit = async () => {
    if(!form.name || !form.surname || !form.IDPC){
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola!')
    }else{
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(form));
        setSavedStudents(form);
        test();
      } catch (error) {
        console.error("Błąd podczas zapisywania danych:", error);
      }
    }
  }

  const test = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      Alert.alert("Test", `Zapisano : ${jsonValue}`)
    } catch (e) {
      console.log(e);
    }
  }

  const getItemCount = _data => 50;

  const getItem = (index) => ({
    title: `Item ${index + 1}`,
  });
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex flex-col w-full h-full px-2"> 
          <View className="w-full flex flex-row">
            <Text className="flex grow text-2xl font-semibold text-white mt-5">
              ZAPIS STUDENTÓW
            </Text>
            <CustomButton title="Generuj listę" handlePress={generate} containerStyles="bg-quaternary grow mt-3"/>
          </View>
          <View className="mb-2"> 
            <FormField 
              title="Imię"
              value={form.name}
              handleChangeText = {(e) => setForm({...form, name: e})}
            />
            <FormField 
              title="Nazwisko"
              value={form.surname}
              handleChangeText = {(e) => setForm({...form, surname: e})}
            />
            <FormField 
              title="Nr stanowiska"
              value={form.IDPC}
              handleChangeText = {(e) => setForm({...form, IDPC: e})}
            />
          </View>
          <CustomButton title="Zapisz" handlePress={formSubmit} containerStyles="bg-quaternary"/>
          <View className="w-full">
            <VirtualizedList 
              data={savedStudents}
              renderItem={renderItem}
              getItemCount={getItemCount}
              keyExtractor={(item, index) => index.toString()}
              getItem={getItem}
            />
          </View> 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Registration