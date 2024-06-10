import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { styled } from 'nativewind';
import * as FileSystem from 'expo-file-system';

const StyledView = styled(View);
const StyledText = styled(Text);

const positions = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Assessment() {
  const [students, setStudents] = useState([
    { id: '1', name: 'Student A', position: '1', tasks: [false, false, false] },
    { id: '2', name: 'Student B', position: '2', tasks: [false, false, false] },
    { id: '3', name: 'Student C', position: '3', tasks: [false, false, false] },
  ]);

  const handleSave = async () => {
    const csvData = students.map((student) => ({
      position: student.position,
      name: student.name,
      tasks: student.tasks.join(', '),
      grade: student.tasks.filter(Boolean).length + 2, // Example grading logic
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
    const fileName = `${FileSystem.documentDirectory}attendance_${new Date().toISOString()}.csv`;
    await FileSystem.writeAsStringAsync(fileName, csvString);
    alert(`Zapisano plik: ${fileName}`);
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
