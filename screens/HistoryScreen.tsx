import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HistoryScreen: React.FC<{ route: any }> = ({ route }) => {
  const [history, setHistory] = useState<string[]>([]);

  // Obtener la decisión seleccionada desde la ruta (si existe)
  useEffect(() => {
    if (route.params?.decision) {
      setHistory([...history, route.params.decision]);
    }
  }, [route.params?.decision]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Decisiones</Text>

      {/* Lista de decisiones */}
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.decision}>{item}</Text>
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
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  decision: {
    fontSize: 16,
    color: '#333',
  },
});

export default HistoryScreen;