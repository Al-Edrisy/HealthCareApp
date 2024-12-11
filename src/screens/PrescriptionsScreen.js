import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const prescriptions = [
  { id: '1', name: 'Aspirin', dosage: '100mg', date: '2024-01-12' },
  { id: '2', name: 'Metformin', dosage: '500mg', date: '2024-02-15' },
  // Add more prescriptions here
];

const PrescriptionsScreen = () => {
  return (
    <FlatList
      data={prescriptions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Text variant="titleMedium">{item.name}</Text>
          <Text>Dosage: {item.dosage}</Text>
          <Text>Date: {item.date}</Text>
        </Card>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
});

export default PrescriptionsScreen;
