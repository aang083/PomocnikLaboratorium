import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
// import { useRouter, useSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
// import CheckBox from '@react-native-community/checkbox';
import { styled } from 'nativewind';
import { useStudents } from '../../context/StudentContext';

const StyledView = styled(View);
const StyledText = styled(Text);

//TODO: nie widziałem jeszcze tego ekranu, nie wiem jak działa 
// całość do kosza realizacja tego ekranu w section/[id].jsx

export default function SectionAssessment() {
  const { selected, removeSection } = useStudents();
  
  const returnHandle = () => {
    removeSection(selected);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StyledView className="flex-1 p-4 mt-10">
        <StyledText className="text-white text-3xl mb-4">Ocenianie Sekcji {selected}</StyledText>
        <TouchableOpacity onPress={returnHandle} className="bg-blue-600 p-2.5 rounded-md items-center justify-center mt-2.5">
          <Link href={`/assessment`} className="text-white text-lg text-center">
            <Text className="text-white text-lg text-center">Akceptuj</Text>
          </Link>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}

        {/* <FlatList
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
        /> */}