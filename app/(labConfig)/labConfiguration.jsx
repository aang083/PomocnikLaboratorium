import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styled } from 'nativewind';
import RadioButtonRN from 'radio-buttons-react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function LabConfiguration() {
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  const grades = [
    { label: 'Ocena: 3', value: '3' },
    { label: 'Ocena: 4', value: '4' },
    { label: 'Ocena: 5', value: '5' },
  ];

  const saveTasksToStorage = async () => {
    try {
      const jsonValue = JSON.stringify(tasks); // Zapisuje tablicę zadań i ocen
      await AsyncStorage.setItem('labTasks', jsonValue);
      console.log('Zadania zostały zapisane');
    } catch (e) {
      console.error('Błąd podczas zapisywania zadań', e);
    }
  };

  const handleTaskCountChange = (value) => {
    const count = parseInt(value, 10);
    if (!isNaN(count)) {
      setTaskCount(count);
      const newTasks = Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        grade: '',
      }));
      setTasks(newTasks);
    }
  };

  const handleGradeChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index].grade = value;
    setTasks(newTasks);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StyledView className="flex-1 p-4 mt-8">
        <StyledText className="text-white text-2xl mb-4">Konfiguracja Laboratorium</StyledText>
        <StyledText className="text-white mb-2">Ilość zadań:</StyledText>
        <RNPickerSelect
          onValueChange={handleTaskCountChange}
          items={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
          ]}
          placeholder={{
            label: 'Wybierz ilość zadań...',
            value: null,
            color: 'white',
          }}
          style={{
            inputIOS: {
              color: 'white',
              backgroundColor: '#444',
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
            },
            inputAndroid: {
              color: 'white',
              backgroundColor: '#444',
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
            },
            placeholder: {
              color: 'white',
            },
          }}
        />
        {tasks.length > 0 && (
          <StyledView className="flex-1 mt-4">
            <StyledView className="flex-row justify-between bg-gray-800 p-4 rounded mb-2">
              <StyledText className="text-white flex-1 text-center">Numer zadania</StyledText>
              <StyledText className="text-white flex-1 text-center">Ocena: 3</StyledText>
              <StyledText className="text-white flex-1 text-center">Ocena: 4</StyledText>
              <StyledText className="text-white flex-1 text-center">Ocena: 5</StyledText>
            </StyledView>
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <StyledView className="flex-row justify-between bg-gray-700 p-4 rounded mb-2">
                  <StyledText className="text-white flex-1 text-center">{item.id}</StyledText>
                  <StyledView className="flex-1 justify-center items-center">
                    <RadioButtonRN
                      data={[grades[0]]}
                      selectedBtn={(e) => handleGradeChange(index, e.value)}
                      box={false}
                      circleSize={16}
                      activeColor="#1E90FF"
                      textStyle={{ display: 'none' }}
                      initial={item.grade === '3' ? 1 : 0}
                    />
                  </StyledView>
                  <StyledView className="flex-1 justify-center items-center">
                    <RadioButtonRN
                      data={[grades[1]]}
                      selectedBtn={(e) => handleGradeChange(index, e.value)}
                      box={false}
                      circleSize={16}
                      activeColor="#1E90FF"
                      textStyle={{ display: 'none' }}
                      initial={item.grade === '4' ? 1 : 0}
                    />
                  </StyledView>
                  <StyledView className="flex-1 justify-center items-center">
                    <RadioButtonRN
                      data={[grades[2]]}
                      selectedBtn={(e) => handleGradeChange(index, e.value)}
                      box={false}
                      circleSize={16}
                      activeColor="#1E90FF"
                      textStyle={{ display: 'none' }}
                      initial={item.grade === '5' ? 1 : 0}
                    />
                  </StyledView>
                </StyledView>
              )}
            />
            <TouchableOpacity className="bg-blue-600 p-2.5 rounded-md items-center justify-center" onPress={saveTasksToStorage}>
              <Link href="/assessment" className="bg-blue-600 p-2.5 rounded-md items-center justify-center">
                <Text className="text-white text-base text-center self-center">Oceniaj</Text>
              </Link>
            </TouchableOpacity>
          </StyledView>
        )}
      </StyledView>
    </SafeAreaView>
  );
}
