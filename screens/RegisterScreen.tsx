import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig'; // Asegúrate de que auth sea una instancia de Firebase v9
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importa el método desde firebase/auth
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importa el tipo de navegación
import { RootStackParamList } from '../navigation/types'; // Importa los tipos de rutas

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigation = useNavigation<RegisterScreenNavigationProp>(); // Especifica el tipo de navegación

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      // Usa createUserWithEmailAndPassword de Firebase v9
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registro exitoso', `Bienvenido, ${email}`);
      navigation.navigate('Home'); // Navegar a la pantalla principal después del registro
    } catch (error: any) {
      let errorMessage = 'No se pudo registrar. Intenta de nuevo.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo ya está en uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'El correo no es válido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es demasiado débil.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {/* Campo de correo electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Campo de confirmación de contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Botón de registro */}
      <Button title="Registrarse" onPress={handleRegister} />

      {/* Enlace para ir a la pantalla de inicio de sesión */}
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        ¿Ya tienes una cuenta? Inicia sesión
      </Text>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  link: {
    marginTop: 10,
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default RegisterScreen;