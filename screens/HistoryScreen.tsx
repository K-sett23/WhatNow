import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { firestore, auth } from '../firebaseConfig';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'; // Importa los métodos de Firestore

type Decision = {
  id: string;
  text: string;
  date: string;
};

const HistoryScreen: React.FC = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        // Crea una referencia a la colección 'decisions'
        const decisionsRef = collection(firestore, 'decisions');
        
        // Crea una consulta para filtrar por userId y ordenar por fecha
        const q = query(
          decisionsRef,
          where('userId', '==', auth.currentUser?.uid),
          orderBy('date', 'desc')
        );

        // Ejecuta la consulta
        const snapshot = await getDocs(q);

        // Mapea los documentos a un array de decisiones
        const decisionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text, // Asegúrate de que 'text' y 'date' existan en tus documentos
          date: doc.data().date,
        })) as Decision[];

        setDecisions(decisionsData);
      } catch (error) {
        console.error('Error al recuperar las decisiones:', error);
      }
    };

    fetchDecisions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Decisiones</Text>
      <FlatList
        data={decisions}
        renderItem={({ item }) => (
          <View style={styles.decisionItem}>
            <Text style={styles.decisionText}>{item.text}</Text>
            <Text style={styles.decisionDate}>{new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
    marginBottom: 20,
    color: '#333',
  },
  decisionItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  decisionText: {
    fontSize: 16,
    color: '#333',
  },
  decisionDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default HistoryScreen;