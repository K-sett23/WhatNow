import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../firebaseConfig"; // Importa auth desde firebaseConfig
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa el método de autenticación
import Recaptcha from "react-native-recaptcha-that-works";

const SITE_KEY = "6Lev2uMqAAAAABS_9cS1LbmIdryHuFgkwbj_ht4k"; // Reemplaza con tu clave de sitio
const BASE_URL = "http://10.0.2.2:8081";

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const recaptchaRef = useRef<any>(null);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
            return;
        }
        if (!captchaVerified) {
            Alert.alert("Error", "Por favor, verifica el captcha.");
            return;
        }

        try {
            // Iniciar sesión con Firebase
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Inicio de sesión exitoso", `Bienvenido, ${email}`);
            navigation.navigate("Home"); // Navegar a la pantalla principal
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Alert.alert("Error", "Correo o contraseña incorrectos.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Verificar Captcha" onPress={() => recaptchaRef.current?.open()} />

            <Recaptcha
                ref={recaptchaRef}
                siteKey={SITE_KEY}
                baseUrl={BASE_URL}
                onVerify={() => setCaptchaVerified(true)}
                onExpire={() => setCaptchaVerified(false)}
                onError={() => Alert.alert("Error", "Error al verificar el captcha.")}
                size="normal"
            />

            <Button title="Iniciar Sesión" onPress={handleLogin} disabled={!captchaVerified} />

            <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
                ¿No tienes una cuenta? Regístrate
            </Text>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    link: {
        marginTop: 10,
        color: "#007BFF",
        textAlign: "center",
    },
});

export default LoginScreen;