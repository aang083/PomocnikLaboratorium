import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      const storedStudents = await AsyncStorage.getItem("students");
      if (storedStudents) {
        setStudents(JSON.parse(storedStudents));
      }
    };
    loadStudents();
  }, []);

  const addStudent = async (student) => {
    const newStudents = [...students, student];
    setStudents(newStudents);
    await AsyncStorage.setItem("students", JSON.stringify(newStudents));
  };

  const removeStudent = async (index) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
    await AsyncStorage.setItem("students", JSON.stringify(newStudents));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, removeStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);
