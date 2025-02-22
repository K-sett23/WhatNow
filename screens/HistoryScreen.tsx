import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Decision = {
  text: string;
  color: string;
  date: string;
};

const HistoryScreen: React.FC<{ route: any }> = ({ route }) => {
  // Obtener las decisiones pasadas desde la ruta (si existen)
  const decisions: Decision[] = route.params?.decisions || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Decisiones</Text>

      {/* Lista de decisiones */}
      <FlatList
        data={decisions}
        renderItem={({ item }) => (
          <View style={[styles.decisionItem, { backgroundColor: item.color }]}>
            <Text style={styles.decisionText}>{item.text}</Text>
            <Text style={styles.decisionDate}>{item.date}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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
    borderRadius: 10,
  },
  decisionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  decisionDate: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
});

export default HistoryScreen;