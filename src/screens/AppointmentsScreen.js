import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Text, Button, Card, IconButton, Dialog, Portal, TextInput } from 'react-native-paper';

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ title: '', date: '', time: '' });

  // Function to show the dialog
  const showDialog = () => setVisible(true);

  // Function to hide the dialog
  const hideDialog = () => {
    setNewAppointment({ title: '', date: '', time: '' });
    setVisible(false);
  };

  // Function to add a new appointment
  const addAppointment = () => {
    if (!newAppointment.title || !newAppointment.date || !newAppointment.time) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setAppointments([
      ...appointments,
      { id: Date.now().toString(), ...newAppointment },
    ]);
    hideDialog();
  };

  // Function to delete an appointment
  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  // Render an appointment item
  const renderAppointment = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{`${item.date} at ${item.time}`}</Text>
      </View>
      <IconButton
        icon="delete"
        size={20}
        onPress={() => deleteAppointment(item.id)}
        style={styles.deleteIcon}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Appointments
      </Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointment}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No appointments yet. Add one!</Text>
        }
      />

      <Button mode="contained" onPress={showDialog} style={styles.addButton}>
        Add Appointment
      </Button>

      {/* Dialog for adding a new appointment */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Add Appointment</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={newAppointment.title}
              onChangeText={(text) => setNewAppointment({ ...newAppointment, title: text })}
              style={styles.input}
            />
            <TextInput
              label="Date (e.g., 2024-11-30)"
              value={newAppointment.date}
              onChangeText={(text) => setNewAppointment({ ...newAppointment, date: text })}
              style={styles.input}
            />
            <TextInput
              label="Time (e.g., 14:30)"
              value={newAppointment.time}
              onChangeText={(text) => setNewAppointment({ ...newAppointment, time: text })}
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={addAppointment}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#2260FF',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    color: '#666',
  },
  deleteIcon: {
    backgroundColor: '#FFCDD2',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#2260FF',
  },
  input: {
    marginBottom: 15,
  },
});

export default AppointmentsScreen;
