import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export default function registration() {
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
        <TouchableOpacity style={styles.addButton}>
          <Link href="/labConfiguration" style={styles.generateButton}>
            <Text style={styles.generateButtonText} >Generuj listę</Text>
          </Link>
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
