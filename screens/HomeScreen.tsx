import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { auth, firestore } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

const { height } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const addOption = () => {
    if (inputValue.trim()) {
      setOptions([...options, inputValue]);
      setInputValue('');
    }
  };

  const saveDecision = async (selectedOption: string) => {
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
  };

  const chooseRandomOption = () => {
    if (options.length > 0) {
      const randomIndex = Math.floor(Math.random() * options.length);
      const selectedOption = options[randomIndex];
      saveDecision(selectedOption); // Guardar la decisión en Firestore
    } else {
      Alert.alert('Error', 'No hay opciones para elegir. Agrega algunas primero.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WhatNow?</Text>
      <Text style={styles.subtitle}>Agrega tus opciones:</Text>

      {/* Contenedor para el input y el botón de agregar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Escribe una opción"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addOption}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de opciones con desplazamiento */}
      <View style={styles.listContainer}>
        <FlatList
          data={options}
          renderItem={({ item }) => (
            <View style={styles.option}>
              <Text style={styles.optionText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Botones para decidir y ver historial */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={chooseRandomOption}>
          <Text style={styles.actionButtonText}>Decidir por mí</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.actionButtonText}>Ver Historial</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    height: height * 0.4,
    marginBottom: 20,
  },
  option: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;