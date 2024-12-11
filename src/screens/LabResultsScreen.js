import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const labResults = [
  { id: '1', test: 'Blood Test', result: 'Normal', date: '2024-01-12' },
  { id: '2', test: 'X-ray', result: 'No Issues', date: '2024-02-15' },
  // Add more results here
];

const LabResultsScreen = () => {
  return (
    <FlatList
      data={labResults}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Text variant="titleMedium">{item.test}</Text>
          <Text>Result: {item.result}</Text>
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

export default LabResultsScreen;
