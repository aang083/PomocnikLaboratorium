import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

export default function HomeScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');

  const addStudent = () => {
    if (firstName && lastName && position) {
      setStudents([...students, { firstName, lastName, position }]);
      setFirstName('');
      setLastName('');
      setPosition('');
    } else {
      alert('Proszę wypełnić wszystkie pola');
    }
  };

  const removeStudent = (index) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E', marginTop: '2px'}}>
      <StyledView className="flex-1 p-4">
        <StyledText className="text-white text-2xl mb-4">ZAPIS STUDENTÓW</StyledText>
        <StyledView className="flex-1 mb-4 bg-gray-700 p-4 rounded">
          {students.length === 0 ? (
            <StyledText className="text-white text-center">Lista już zapisanych studentów</StyledText>
          ) : (
            <FlatList
              data={students}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View className="flex-row justify-between items-center mb-2">
                  <StyledText className="text-white">
                    {item.firstName} {item.lastName} - {item.position}
                  </StyledText>
                  <TouchableOpacity onPress={() => removeStudent(index)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Usuń</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </StyledView>
        <StyledTextInput
          className="bg-gray-700 text-white mb-2 p-2 rounded"
          placeholder="Imię"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
        />
        <StyledTextInput
          className="bg-gray-700 text-white mb-2 p-2 rounded"
          placeholder="Nazwisko"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={setLastName}
        />
        <StyledTextInput
          className="bg-gray-700 text-white mb-2 p-2 rounded"
          placeholder="Nr stanowiska"
          placeholderTextColor="#999"
          value={position}
          onChangeText={setPosition}
        />
        <TouchableOpacity onPress={addStudent} style={styles.addButton}>
          <Text style={styles.addButtonText}>Dodaj</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Config')} style={styles.generateButton}>
          <Text style={styles.generateButtonText}>Generuj listę</Text>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  generateButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});


// import { View, Text, ScrollView, Alert, FlatList } from "react-native";
// import { useState, useEffect } from "react";
// import { Link, router } from "expo-router";
// import { SafeAreaView } from 'react-native-safe-area-context'
// import CustomButton from "../../components/CustomButton";
// import Tile from "../../components/Tile";
// import FormField from "../../components/FormField";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const STORAGE_KEY = "sectionList";

// const Registration = () => {
//   const [name, setName] = useState('');
//   const [surname, setSurname] = useState('');
//   const [pcid, setPcid] = useState('');

//   const [savedStudents, setSavedStudents] = useState([]);

//   const generate = () => {

//   }

//   const handleDelete = () =>{

//   }

//   const renderItem = ({ item }) => (
//     <Text key={item.id}>{`${item.firstName} ${item.lastName}`}</Text>
//   );
  
//   const formSubmit = async () => {
//     if(!name || !surname || !pcid){
//       Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola!')
//     }else{
//       const userId = Date.now().toString();
//       setSavedStudents([...savedStudents, {id: userId, name, surname, pcid}])
//       setName('');
//       setSurname('');
//       setPcid('');
//       handleShowUsers();
//     }
//   }
//   const handleShowUsers = () => {
//     const usersText = savedStudents.map(() => `${name} ${surname} ${pcid}`).join('\n');
//     Alert.alert('Lista użytkowników', usersText);
//   };
  
//   return (
//     <SafeAreaView className="bg-primary h-full">
//         <View className="flex flex-col w-full h-full px-2"> 
//           <View className="w-full flex flex-row">
//             <Text className="flex grow text-2xl font-semibold text-white mt-5">
//               ZAPIS STUDENTÓW
//             </Text>
//             <CustomButton title="Generuj listę" handlePress={generate} containerStyles="bg-quaternary grow mt-3"/>
//           </View>
//           <View className="mb-2 flex flex-col h-[250]"> 
//             <FormField 
//               title="Imię"
//               value={name}
//               handleChangeText = {setName}
//             />
//             <FormField 
//               title="Nazwisko"
//               value={surname}
//               handleChangeText = {setSurname}
//             />
//             <FormField 
//               title="Nr stanowiska"
//               value={pcid}
//               handleChangeText = {setPcid}
//             />
//           </View>
//           <CustomButton title="Zapisz" handlePress={formSubmit} containerStyles="bg-quaternary"/>
//         </View>
//         <View className="w-full">
//           <FlatList 
//             data={savedStudents}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//           />
//         </View>
//     </SafeAreaView>
//   )
// }

// export default Registration;


