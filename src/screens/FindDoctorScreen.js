import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';

const doctors = [
  { id: '1', name: 'Dr. John Smith', specialty: 'Cardiologist', photo: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Dr. Emily Brown', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  // Add more doctor profiles here
];

const FindDoctorScreen = () => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Avatar.Image size={50} source={{ uri: item.photo }} />
        <View style={styles.info}>
          <Text variant="titleMedium">{item.name}</Text>
          <Text>{item.specialty}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <FlatList
      data={doctors}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: 10,
  },
});

export default FindDoctorScreen;
