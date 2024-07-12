import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { styled } from 'nativewind';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useStudents } from '../context/StudentContext';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Assessment() {
  const { students } = useStudents();
  const positions = Array.from(new Set(students.map(student => student.position)));

  const handleSave = async () => {
    const csvData = students.map((student) => ({
      position: student.position,
      name: student.name,
      tasks: student.tasks ? student.tasks.join(', ') : '',
      grade: student.tasks ? student.tasks.filter(Boolean).length + 2 : 0, // Example grading logic
    }));
    const csvString = [
      ['Position', 'Name', 'Task 1', 'Task 2', 'Task 3', 'Grade'],
      ...csvData.map((row) => [
        row.position,
        row.name,
        ...row.tasks.split(', '),
        row.grade,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    // Ścieżka do katalogu pobierania na Androidzie
    const downloadDir = FileSystem.documentDirectory;
    const fileName = `${downloadDir}attendance_${new Date().toISOString()}.csv`;

    try {
      await FileSystem.writeAsStringAsync(fileName, csvString);
      if (!(await Sharing.isAvailableAsync())) {
        alert(`Zapisano plik: ${fileName}`);
        return;
      }
      await Sharing.shareAsync(fileName);
    } catch (error) {
      console.error("Błąd zapisu pliku: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StyledView className="flex-1 p-4">
        <StyledText className="text-white text-2xl mb-4">Ocenianie Sekcji {position}</StyledText>
        <FlatList
          data={positions}
          numColumns={2}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.positionButton}>
              <Link href={`/studentAssessment/sectionAssessment?position=${item}`} style={styles.positionButtonText}>
                <Text style={styles.positionButtonText}>{item}</Text>
              </Link>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Zapisz</Text>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  positionButton: {
    flex: 1,
    margin: 10,
    backgroundColor: '#1E90FF',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
