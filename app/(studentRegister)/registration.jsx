import { View, Text, ScrollView, Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from "../../components/CustomButton";
import Tile from "../../components/Tile";
import FormField from "../../components/FormField";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "sectionList";

const Registration = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [pcid, setPcid] = useState('');

  const [savedStudents, setSavedStudents] = useState([]);

  const generate = () => {

  }

  const handleDelete = () =>{

  }

  const renderItem = ({ item }) => (
    <Text key={item.id}>{`${item.firstName} ${item.lastName}`}</Text>
  );
  
  const formSubmit = async () => {
    if(!name || !surname || !pcid){
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola!')
    }else{
      const userId = Date.now().toString();
      setSavedStudents([...savedStudents, {id: userId, name, surname, pcid}])
      setName('');
      setSurname('');
      setPcid('');
      handleShowUsers();
    }
  }
  const handleShowUsers = () => {
    const usersText = savedStudents.map(() => `${name} ${surname} ${pcid}`).join('\n');
    Alert.alert('Lista użytkowników', usersText);
  };
  
  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="flex flex-col w-full h-full px-2"> 
          <View className="w-full flex flex-row">
            <Text className="flex grow text-2xl font-semibold text-white mt-5">
              ZAPIS STUDENTÓW
            </Text>
            <CustomButton title="Generuj listę" handlePress={generate} containerStyles="bg-quaternary grow mt-3"/>
          </View>
          <View className="mb-2 flex flex-col h-[250]"> 
            <FormField 
              title="Imię"
              value={name}
              handleChangeText = {setName}
            />
            <FormField 
              title="Nazwisko"
              value={surname}
              handleChangeText = {setSurname}
            />
            <FormField 
              title="Nr stanowiska"
              value={pcid}
              handleChangeText = {setPcid}
            />
          </View>
          <CustomButton title="Zapisz" handlePress={formSubmit} containerStyles="bg-quaternary"/>
        </View>
        <View className="w-full">
          <FlatList 
            data={savedStudents}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
    </SafeAreaView>
  )
}

export default Registration;

// ------------ może się przyda -------------------

// try {
//   await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(form));
//   setSavedStudents(form);
//   test();
// } catch (error) {
//   console.error("Błąd podczas zapisywania danych:", error);
// }

// 

// const test = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
//     Alert.alert("Zawatosc Async-Storage", `Zapisano : ${jsonValue}`)
//   } catch (e) {
//     console.log(e);
//   }
// }

  // const renderItem = ({ item }) => {
  //   return (
  //     <Tile
  //       name={item.name}
  //       surname={item.surname}
  //       IDPC={item.IDPC}
  //       onRemove={handleDelete}
  //     />
  //   );
  // };

  
  // useEffect(() => {
  //   const loadSavedStudents = async () => {
  //     try {
  //       const storedSavedStudents = await AsyncStorage.getItem(STORAGE_KEY);
  //       if (storedSavedStudents) {
  //         setSavedStudents(JSON.parse(storedSavedStudents));
  //       }
  //     } catch (error) {
  //       console.error("Błąd podczas wczytywania danych:", error);
  //     }
  //   };
  //   loadSavedStudents();
  // }, []);