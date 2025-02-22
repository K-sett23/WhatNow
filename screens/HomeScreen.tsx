import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // Función para agregar una opción
  const addOption = () => {
    if (inputValue.trim()) {
      setOptions([...options, inputValue]);
      setInputValue('');
    } else {
      Alert.alert('Error', 'Por favor, escribe una opción válida.');
    }
  };

  // Función para seleccionar una opción al azar
  const chooseRandomOption = () => {
    if (options.length > 0) {
      const randomIndex = Math.floor(Math.random() * options.length);
      const selectedOption = options[randomIndex];
      Alert.alert('Opción seleccionada', `La opción seleccionada es: ${selectedOption}`);
      // Navegar a la pantalla de historial (opcional)
      navigation.navigate('History', { decision: selectedOption });
    } else {
      Alert.alert('Error', 'No hay opciones para elegir. Agrega algunas primero.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WhatNow?</Text>
      <Text style={styles.subtitle}>Agrega tus opciones:</Text>

      {/* Input para agregar opciones */}
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Escribe una opción"
        placeholderTextColor="#999"
      />

      {/* Botón para agregar opciones */}
      <Button title="Agregar" onPress={addOption} />

      {/* Lista de opciones */}
      <FlatList
        data={options}
        renderItem={({ item }) => (
          <View style={styles.optionItem}>
            <Text style={styles.optionText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />

      {/* Botón para seleccionar una opción al azar */}
      <Button title="Decidir por mí" onPress={chooseRandomOption} />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  optionItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;