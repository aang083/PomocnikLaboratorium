import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { styled } from 'nativewind';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStudents } from '../../../context/StudentContext';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Page() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { students } = useStudents(); // Odczytanie studentów z kontekstu

  // Filtrowanie studentów dla konkretnej sekcji
  const filteredStudents = students.filter(student => student.position === id);
  const [tasks, setTasks] = useState([]);

  const saveSectionTasks = async (sectionId, tasks) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(`sectionTasks_${sectionId}`, jsonValue);
      console.log(`Zadania dla sekcji ${sectionId} zostały zapisane.`);
    } catch (e) {
      console.error('Błąd podczas zapisywania zadań:', e);
    }
  };

  const getSectionTasks = async (sectionId) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`sectionTasks_${sectionId}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Błąd podczas odczytu zadań:', e);
      return null;
    }
  };

  // Funkcja do pobierania domyślnych zadań z LabConfiguration
  const fetchDefaultTasksFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('labTasks');
      if (jsonValue != null) {
        return JSON.parse(jsonValue); // Zwraca zadania z LabConfiguration
      } else {
        return [];
      }
    } catch (e) {
      console.error('Błąd podczas odczytu domyślnych zadań z LabConfiguration:', e);
      return [];
    }
  };

  // Funkcja do załadowania zadań dla sekcji (z AsyncStorage lub z LabConfiguration)
  const fetchTasksForSection = async () => {
    const storedTasks = await getSectionTasks(id);

    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks); // Jeśli zadania są w AsyncStorage, ustaw je
    } else {
      // Jeśli nie ma zadań dla tej sekcji, pobierz domyślne zadania z LabConfiguration
      const defaultTasks = await fetchDefaultTasksFromStorage();
      setTasks(defaultTasks);
      if (defaultTasks.length > 0) {
        saveSectionTasks(id, defaultTasks); // Zapisz domyślne zadania w AsyncStorage
      }
    }
  };

  const handleTaskCompletionToggle = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveSectionTasks(id, updatedTasks); // Zapisujemy zaktualizowane zadania
  };

  useEffect(() => {
    fetchTasksForSection(); // Odczyt zadań przy pierwszym załadowaniu
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StyledView className="flex-1 p-4 mt-10">
        <StyledText className="text-white text-3xl mb-4">Ocenianie Sekcji {id}</StyledText>

        {/* Sekcja z listą studentów */}
        <StyledText className="text-gray-300 mb-2">Skład sekcji:</StyledText>
        <StyledView className="bg-gray-300 p-2 mb-4 rounded">
          {filteredStudents.length > 0 ? (
            <FlatList
              data={filteredStudents}
              renderItem={({ item }) => <Text>{item.firstName} {item.lastName}</Text>}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>Brak studentów przypisanych do tej sekcji</Text>
          )}
        </StyledView>

        {/* Sekcja z zadaniami */}
        <StyledText className="text-gray-300 mb-2">Wykonane zadania:</StyledText>
        <StyledView className="bg-gray-300 p-2 mb-4 rounded">
          {tasks.map(task => (
            <StyledView key={task.id} className="flex-row justify-between items-center mb-2">
              <Text>{task.name}</Text>
              <TouchableOpacity onPress={() => handleTaskCompletionToggle(task.id)}>
                <Text>{task.completed ? '✔️' : '❌'}</Text>
              </TouchableOpacity>
            </StyledView>
          ))}
        </StyledView>

        {/* Przycisk Zapisz */}
        <TouchableOpacity className="bg-red-600 p-2 rounded-md items-center justify-center mt-4" onPress={async () => {
          await saveSectionTasks(id, tasks); // Najpierw zapisujemy zadania
          router.push('/assessment'); // Potem nawigujemy
        }}>
          <Text className="text-white text-lg text-center">Akceptuj</Text>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}
