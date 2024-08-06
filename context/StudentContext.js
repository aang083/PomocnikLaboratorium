import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  // const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const storedStudents = await AsyncStorage.getItem("students");
      if (storedStudents) {
        setStudents(JSON.parse(storedStudents));
      }
      const selectedSection = await AsyncStorage.getItem("selected");
      if (selectedSection) {
        setSelected(JSON.parse(selectedSection));
      }
    };
    load();
  }, []);

  const addStudent = async (student) => {
    const newStudents = [...students, student];
    setStudents(newStudents);
    await AsyncStorage.setItem("students", JSON.stringify(newStudents));
  };

  const addSection = async (idSection) => {
    const newSectionList = [...selected, idSection];
    setSelected(newSectionList);
    await AsyncStorage.setItem("selected", JSON.stringify(newSectionList));
  };

  const removeStudent = async (index) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
    await AsyncStorage.setItem("students", JSON.stringify(newStudents));
  };

  const removeSection = async (index) => {
    const newSectionList = [...selected];
    newSectionList.splice(index, 1);
    setSelected(newSectionList);
    await AsyncStorage.setItem("selected", JSON.stringify(newSectionList));
  };

  return (
    <StudentContext.Provider
      value={{ students, addStudent, removeStudent, addSection, removeSection }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);
