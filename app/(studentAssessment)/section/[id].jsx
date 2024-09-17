import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { Link } from "expo-router";
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

  const fetchTasksFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('labTasks');
      if (jsonValue != null) {
        setTasks(JSON.parse(jsonValue)); // Ustawia zadania w stanie
      }
    } catch (e) {
      console.error('Błąd podczas odczytu zadań', e);
    }
  };

  useEffect(() => {
    fetchTasksFromStorage();
  }, []);
  
  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
              <TouchableOpacity onPress={() => toggleTaskCompletion(task.id)}>
                <Text>{task.completed ? '✔️' : '❌'}</Text>
              </TouchableOpacity>
            </StyledView>
          ))}
        </StyledView>

        {/* Przycisk Zapisz */}
        <TouchableOpacity className="bg-red-600 p-2 rounded-md items-center justify-center mt-4" onPress={() => router.push('/assessment')}>
          <Text className="text-white text-lg text-center">Akceptuj</Text>
        </TouchableOpacity>
      </StyledView>
    </SafeAreaView>
  );
}

// import React from "react";
// import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
// import { Link } from "expo-router";
// import { styled } from 'nativewind';
// import { useRouter, useLocalSearchParams } from 'expo-router';

// const StyledView = styled(View);
// const StyledText = styled(Text);

// export default function Page() {
//   const { id } = useLocalSearchParams();
//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
//         <StyledView className="flex-1 p-4 mt-10">
//           <StyledText className="text-white text-3xl mb-4">Ocenianie Sekcji {id}</StyledText>
//           <TouchableOpacity className="bg-blue-600 p-2.5 rounded-md items-center justify-center mt-2.5">
//             <Link href={`/assessment`} className="text-white text-lg text-center">
//               <Text className="text-white text-lg text-center">Akceptuj</Text>
//             </Link>
//           </TouchableOpacity>
//         </StyledView>
//       </SafeAreaView>
//     );
//   }