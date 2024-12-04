import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';

const HealthHistoryScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>Health History</Text>

      <Card style={styles.card}>
        <Text variant="titleMedium" style={styles.cardTitle}>Medical Conditions</Text>
        <Text variant="bodyMedium">List of diagnosed medical conditions, e.g., Diabetes, Hypertension, etc.</Text>
      </Card>

      <Card style={styles.card}>
        <Text variant="titleMedium" style={styles.cardTitle}>Previous Surgeries</Text>
        <Text variant="bodyMedium">Details about any previous surgeries you may have had.</Text>
      </Card>

      <Card style={styles.card}>
        <Text variant="titleMedium" style={styles.cardTitle}>Family History</Text>
        <Text variant="bodyMedium">Any relevant family medical history, such as genetic diseases.</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    color: '#2260FF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    color: '#2260FF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HealthHistoryScreen;
