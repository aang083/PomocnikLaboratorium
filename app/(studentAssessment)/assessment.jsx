import React from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStudents } from '../../context/StudentContext';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Assessment() {
  const router = useRouter();
  const { students } = useStudents();
  const positions = Array.from(new Set(students.map(student => student.position)));

  // Funkcja czyszcząca AsyncStorage po zapisaniu CSV
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage wyczyszczony');
    } catch (e) {
      console.error('Błąd podczas czyszczenia AsyncStorage:', e);
    }
  };
  const getSectionTasks = async (sectionId) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`sectionTasks_${sectionId}`);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Błąd podczas odczytu zadań:', e);
      return [];
    }
  };
  // Funkcja zapisująca do pliku CSV z wykorzystaniem Storage Access Framework na Androidzie
  const handleSave = async () => {
    const csvData = await Promise.all(
      students.map(async (student) => {
        const tasks = await getSectionTasks(student.position); // Pobieramy zadania z AsyncStorage dla konkretnego stanowiska
        const taskGrades = tasks.map(task => task.grade || '0'); // Pobieramy oceny dla zadań
        const completedTasks = tasks.map(task => task.completed ? '1' : '0'); // Pobieramy status ukończenia zadań

        // Znajdujemy maksymalną ocenę spośród wykonanych zadań
        const maxGrade = Math.max(
          ...taskGrades.map((grade, idx) => (completedTasks[idx] === '1' ? parseInt(grade) : 0))
        );

        return {
          position: student.position,
          name: `${student.firstName} ${student.lastName}`,
          tasks: completedTasks,
          grades: taskGrades,
          totalGrade: maxGrade // Zamiast sumy wybieramy maksymalną ocenę
        };
      })
    );

    const maxTasks = Math.max(...csvData.map(row => row.tasks.length));

    const csvString = [
      ['Position', 'Name', ...Array.from({ length: maxTasks }, (_, i) => `Task ${i + 1}`), 'Grade'],
      ...csvData.map((row) => [
        row.position,
        row.name,
        ...row.tasks,
        row.totalGrade
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          `attendance_${new Date().toISOString()}`,
          'text/csv'
        );

        await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, csvString);
        alert(`Zapisano plik: ${fileUri}`);
        clearStorage(); // Czyszczenie AsyncStorage i resetowanie stanu studentów

        // Po zapisaniu wracamy do ekranu startowego
        router.replace('/'); // Nawigacja do ekranu startowego
      } else {
        alert('Brak uprawnień do zapisu pliku');
      }
    } catch (error) {
      console.error('Błąd podczas zapisywania pliku:', error);
      alert('Błąd podczas zapisywania pliku');
    }
  };
  // Funkcja wywołująca alert przed zapisem pliku CSV
  const showSaveConfirmation = () => {
    Alert.alert(
      "Zakończenie laboratorium",
      "Czy chcesz zakończyć laboratorium i zapisać jego wyniki?",
      [
        {
          text: "Nie",
          style: "cancel"
        },
        {
          text: "Tak",
          onPress: handleSave // Jeśli użytkownik wybierze "Tak", generujemy CSV i czyścimy AsyncStorage
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StyledView className="flex-1 p-4 mt-10">
        <StyledText className="text-white text-3xl mb-4">Ocenianie</StyledText>
        <FlatList
          data={positions}
          numColumns={2}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-1 m-2.5 bg-blue-600 p-5 rounded-md items-center justify-center"
              onPress={() => router.push(`/section/${item}`)}
            >
              <Text className="text-white text-lg text-center">Stanowisko {item}</Text>
            </TouchableOpacity>
          )}
        />
        {/* Dodajemy przycisk, który wywołuje alert przed zapisaniem */}
        <TouchableOpacity onPress={showSaveConfirmation} className="bg-blue-600 p-2.5 rounded-md items-center justify-center mt-5">
          <Text className="text-white text-base text-center">Zapisz do CSV</Text>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}
