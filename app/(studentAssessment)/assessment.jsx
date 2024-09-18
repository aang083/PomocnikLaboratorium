import React from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import * as FileSystem from 'expo-file-system';
import { useStudents } from '../../context/StudentContext';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Assessment() {
  const router = useRouter();
  const { students } = useStudents();
  const positions = Array.from(new Set(students.map(student => student.position)));

  // Funkcja zapisująca do pliku CSV z wykorzystaniem Storage Access Framework na Androidzie
  const handleSave = async () => {
    const maxTasks = 10; // Maksymalna liczba zadań do 10
    const csvData = students.map((student) => {
      const tasks = student.tasks || []; // Sprawdzamy, czy student ma przypisane zadania
      const taskGrades = []; // Tablica ocen dla zadań
      const completedTasks = tasks.map((task, index) => {
        taskGrades.push(task.grade || 0); // Przypisujemy ocenę do zadania
        return task.completed ? '1' : '0'; // Status ukończenia zadania
      });

      // Wypełniamy puste zadania, jeśli jest ich mniej niż maxTasks
      while (completedTasks.length < maxTasks) {
        completedTasks.push('0'); // Brak ukończenia zadania
        taskGrades.push('0'); // Brak oceny
      }

      const totalGrade = taskGrades.reduce((acc, grade, idx) => acc + (completedTasks[idx] === '1' ? parseInt(grade) : 0), 0);

      return {
        position: student.position, // Numer stanowiska
        name: `${student.firstName} ${student.lastName}`, // Pełne imię i nazwisko
        tasks: completedTasks, // Status ukończenia zadań (lista 0 i 1)
        grades: taskGrades, // Oceny przypisane do zadań
        totalGrade: totalGrade // Suma ocen za ukończone zadania
      };
    });

    // Generujemy CSV
    const csvString = [
      ['Position', 'Name', ...Array.from({ length: maxTasks }, (_, i) => `Task ${i + 1}`), 'Grade'], // Nagłówki kolumn
      ...csvData.map((row) => [
        row.position,
        row.name,
        ...row.tasks, // Status ukończenia zadań (1 lub 0)
        row.totalGrade // Proponowana ocena
      ]),
    ]
      .map((e) => e.join(',')) // Oddzielamy przecinkami
      .join('\n'); // Dodajemy nowe linie

    try {
      // Otwieramy dokumenty, aby zapisać plik w Downloads na Androidzie
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        // Tworzenie pliku i zapisanie danych bezpośrednio za pomocą Storage Access Framework
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          `attendance_${new Date().toISOString()}`,
          'text/csv'
        );

        await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, csvString);
        alert(`Zapisano plik: ${fileUri}`);
      } else {
        alert('Brak uprawnień do zapisu pliku');
      }
    } catch (error) {
      console.error('Błąd podczas zapisywania pliku:', error);
      alert('Błąd podczas zapisywania pliku');
    }
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
            <TouchableOpacity className="flex-1 m-2.5 bg-blue-600 p-5 rounded-md items-center justify-center"onPress={() => router.push(`/section/${item}`)}>
              <Text className="text-white text-lg text-center">{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={handleSave} className="bg-blue-600 p-2.5 rounded-md items-center justify-center mt-5">
          <Text className="text-white text-base text-center">Zapisz</Text>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}

