import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
const StartScreen = ({ navigation }) => {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [nrStanowiska, setNrStanowiska] = useState("");
  const handleSubmit = () => {
    // Dodaj kod do wysłania danych do serwera
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formElement}>
          <Text style={styles.title}>Imie</Text>
          <TextInput
            style={styles.input}
            placeholder="Imię"
            value={imie}
            onChangeText={setImie}
          />
        </View>
        <View style={styles.formElement}>
          <Text style={styles.title}>Nazwisko</Text>
          <TextInput
            style={styles.input}
            placeholder="Nazwisko"
            value={nazwisko}
            onChangeText={setNazwisko}
          />
        </View>
        <View style={styles.formElement}>
          <Text style={styles.title}>Nr stanowiska</Text>
          <TextInput
            style={styles.input}
            placeholder="Nr stanowiska"
            value={nrStanowiska}
            onChangeText={setNrStanowiska}
          />
        </View>
        <Button title="Dodaj" onPress={handleSubmit} />
      </View>

      <Text style={styles.listTitle}>Lista już zapisanych studentów</Text>
      {/* Dodaj kod do wyświetlania listy studentów */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  formElement: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    flex: 0.5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    color: "white",
    flex: 0.5,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default StartScreen;
