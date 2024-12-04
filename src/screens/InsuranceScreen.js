import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card } from 'react-native-paper';

const insuranceDetails = {
  provider: 'HealthSecure',
  policyNumber: 'HS123456789',
  validUntil: '2025-12-31',
};

const InsuranceScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="headlineSmall">Insurance Details</Text>
        <Text>Provider: {insuranceDetails.provider}</Text>
        <Text>Policy Number: {insuranceDetails.policyNumber}</Text>
        <Text>Valid Until: {insuranceDetails.validUntil}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
});

export default InsuranceScreen;
