import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import CheckBox from '@react-native-community/checkbox';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

//TODO: nie widziałem jeszcze tego ekranu, nie wiem jak działa 
const students = [
  { id: '1', name: 'Student A', tasks: [false, false, false] },
  { id: '2', name: 'Student B', tasks: [false, false, false] },
];

export default function SectionAssessment() {
  const router = useRouter();
  const { position } = useSearchParams();
  const [taskStatus, setTaskStatus] = useState(students);

  const handleTaskChange = (studentIndex, taskIndex, value) => {
    const newTaskStatus = [...taskStatus];
    newTaskStatus[studentIndex].tasks[taskIndex] = value;
    setTaskStatus(newTaskStatus);
  };

  const handleSave = () => {
    // Here you would normally save the data
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StyledView className="flex-1 p-4 mt-10">
        <StyledText className="text-white text-3xl mb-4">Ocenianie Sekcji {position}</StyledText>
        <FlatList
          data={taskStatus}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <StyledView className="mb-4 bg-gray-700 p-4 rounded">
              <StyledText className="text-white mb-2">{item.name}</StyledText>
              <StyledView className="flex-row justify-between">
                {item.tasks.map((task, taskIndex) => (
                  <StyledView key={taskIndex} className="flex-1 justify-center items-center">
                    <CheckBox
                      value={task}
                      onValueChange={(newValue) => handleTaskChange(index, taskIndex, newValue)}
                    />
                  </StyledView>
                ))}
              </StyledView>
            </StyledView>
          )}
        />
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Akceptuj</Text>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
