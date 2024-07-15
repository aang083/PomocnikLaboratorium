import React from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { styled } from 'nativewind';
import * as FileSystem from 'expo-file-system';
import { useStudents } from '../../context/StudentContext';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Assessment() {
  const { students } = useStudents();
  const positions = Array.from(new Set(students.map(student => student.position)));

  const handleSave = async () => {
    //TODO: czyszczenie async po wygenerowanieu CSV, zmiana miejsca zapisu pliku CSV (obecnie nie da się do niego dostać)
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
    const fileName = `${FileSystem.documentDirectory}attendance_${new Date().toISOString()}.csv`;
    await FileSystem.writeAsStringAsync(fileName, csvString);
    alert(`Zapisano plik: ${fileName}`);
  };
//TODO: przekazanie numeru wybranej sekcji do ekranu sectionAssassment - nie działa :(
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StyledView className="flex-1 p-4 mt-10">
        <StyledText className="text-white text-3xl mb-4">Ocenianie</StyledText>
        <FlatList
          data={positions}
          numColumns={2}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity className="flex-1 m-2.5 bg-blue-600 p-5 rounded-md items-center justify-center">
              <Link href={`/studentAssessment/sectionAssessment?position=${item}`} className="text-white text-lg text-center">
                <Text className="text-white text-lg text-center">{item}</Text>
              </Link>
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
