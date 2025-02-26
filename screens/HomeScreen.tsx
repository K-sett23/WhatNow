import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { auth, firestore } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore'; // Importa los métodos de Firestore
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importa el tipo de navegación
import { RootStackParamList } from '../navigation/types'; // Importa los tipos de rutas

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Especifica el tipo de navegación

  const addOption = () => {
    if (inputValue.trim()) {
      setOptions([...options, inputValue]);
      setInputValue('');
    }
  };

  const chooseRandomOption = async () => {
    if (options.length > 0) {
      const randomIndex = Math.floor(Math.random() * options.length);
      const selectedOption = options[randomIndex];
  
      if (!auth.currentUser) {
        Alert.alert('Error', 'Debes iniciar sesión para guardar decisiones.');
        return;
      }
  
      try {
        await addDoc(collection(firestore, 'decisions'), {
          text: selectedOption,
          userId: auth.currentUser.uid,
          date: new Date().toISOString(),
        });
        Alert.alert('Opción seleccionada', `La opción seleccionada es: ${selectedOption}`);
      } catch (error) {
        console.error('Error al guardar la decisión:', error);
        Alert.alert('Error', 'No se pudo guardar la decisión. Intenta de nuevo.');
      }
    } else {
      Alert.alert('Error', 'No hay opciones para elegir. Agrega algunas primero.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WhatNow?</Text>
      <Text style={styles.subtitle}>Agrega tus opciones:</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Escribe una opción"
        placeholderTextColor="#999"
      />
      <Button title="Agregar" onPress={addOption} />
      <FlatList
        data={options}
        renderItem={({ item }) => <Text style={styles.optionText}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Decidir por mí" onPress={chooseRandomOption} />
      <Button title="Ver Historial" onPress={() => navigation.navigate('History')} />
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
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;