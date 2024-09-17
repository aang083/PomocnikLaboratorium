import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { useRouter, Link } from 'expo-router';
import { useStudents } from '../../context/StudentContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export default function Registration() {
  const router = useRouter();
  const { students, addStudent, removeStudent } = useStudents();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');

  const handleAddStudent = () => {
    if (firstName && lastName && position) {
      addStudent({ firstName, lastName, position });
      setFirstName('');
      setLastName('');
      setPosition('');
    } else {
      alert('Proszę wypełnić wszystkie pola');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StyledView className="flex-1 p-4 mt-8">
        <StyledText className="text-white text-3xl mb-4">ZAPIS STUDENTÓW</StyledText>
        <StyledView className="flex-1 mb-4 bg-gray-700 p-4 rounded">
          {students.length === 0 ? (
            <StyledText className="text-white text-center text-xl">Lista już zapisanych studentów</StyledText>
          ) : (
            <FlatList
              data={students}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View className="flex-row justify-between items-center mb-2">
                  <StyledText className="text-white">
                    {item.firstName} {item.lastName} - {item.position}
                  </StyledText>
                  <TouchableOpacity onPress={() => removeStudent(index)} className="bg-red-500 p-1.5 rounded-md">
                    <Text className="text-white">Usuń</Text>
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
        <TouchableOpacity onPress={handleAddStudent} className="bg-blue-600 p-2.5 rounded-md items-center my-2.5">
          <Text className="text-white text-base">Dodaj</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-600 p-2.5 rounded-md my-2.5 items-center justify-center" onPress={() => router.push('/labConfiguration')}>
          {/* <Link href="/labConfiguration" className="bg-blue-600 p-2.5 rounded-md">
            
          </Link> */}
          <Text className="text-white text-base text-center self-center">Generuj listę</Text>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}
