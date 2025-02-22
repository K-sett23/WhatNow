import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TextInput, Alert } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [options, setOptions] = useState<{ text: string; color: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const rotation = useSharedValue(0); // Valor compartido para la rotación

  // Función para generar un color hexadecimal aleatorio
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Función para agregar una opción
  const addOption = () => {
    if (inputValue.trim()) {
      const newOption = {
        text: inputValue,
        color: getRandomColor(), // Asignar un color único
      };
      setOptions([...options, newOption]);
      setInputValue('');
    }
  };

  // Función para seleccionar una opción al azar con animación
  const chooseRandomOption = () => {
    if (options.length > 0) {
      // Gira la ruleta varias veces antes de detenerse
      rotation.value = withTiming(rotation.value + 360 * 5, {
        duration: 3000,
        easing: Easing.out(Easing.ease),
      });

      // Selecciona una opción al azar después de la animación
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * options.length);
        Alert.alert('Opción seleccionada', `La opción seleccionada es: ${options[randomIndex].text}`);
        rotation.value = 0; // Reinicia la rotación
      }, 3000);
    } else {
      Alert.alert('Error', 'No hay opciones para elegir. Agrega algunas primero.');
    }
  };

  // Estilo animado para la ruleta
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Colores para el degradado
  const gradientColors = options.length > 0
    ? options.map((option) => option.color) // Usar colores de las opciones
    : ['#FF0000', '#00FF00']; // Colores predeterminados si no hay opciones

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

      {/* Ruleta de opciones */}
      <View style={styles.ruletaContainer}>
        <Animated.View style={[styles.ruleta, animatedStyle]}>
          <LinearGradient
            colors={gradientColors} // Usar colores de las opciones o colores predeterminados
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            {options.map((option, index) => (
              <Text key={index} style={[styles.optionText, { color: '#fff' }]}>
                {option.text}
              </Text>
            ))}
          </LinearGradient>
        </Animated.View>
      </View>

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
  ruletaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  ruleta: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    overflow: 'hidden', // Para que el degradado no se salga del círculo
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;