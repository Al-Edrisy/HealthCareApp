import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, StyleSheet, Platform } from 'react-native';
import { Text, Button, Card, IconButton, Dialog, Portal, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native';

// Floating Action Button (FAB) style
const FloatingActionButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.fab}>
    <Text style={styles.fabText}>+</Text>
  </TouchableOpacity>
);

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    reminder: '',
  });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const navigation = useNavigation();

  // Request permission for notifications on mount
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications is required to set reminders.');
      }
    };
    requestPermission();
  }, []);

  // Utility function for scheduling notifications
  const scheduleReminderNotification = async (appointment) => {
    const { date, time, reminder } = appointment;
    const reminderDate = new Date(`${date} ${time}`);
    const reminderTime = new Date(reminderDate.getTime() - reminder * 60000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Appointment Reminder',
        body: `Reminder: You have an appointment "${appointment.title}" at ${appointment.time}`,
      },
      trigger: { date: reminderTime },
    });
  };

  // Add appointment with validation
  const addAppointment = () => {
    if (!newAppointment.title || !newAppointment.date || !newAppointment.time) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const appointment = { id: Date.now().toString(), ...newAppointment };
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);

    // Set reminder if applicable
    if (newAppointment.reminder) {
      scheduleReminderNotification(newAppointment);
    }

    hideDialog();
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setNewAppointment({ title: '', date: '', time: '', reminder: '' });
    setVisible(false);
  };

  const deleteAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  const renderAppointment = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{`${item.date} at ${item.time}`}</Text>
        <Text style={styles.reminder}>
          Reminder: {item.reminder ? `${item.reminder} minutes before` : 'No reminder'}
        </Text>
      </View>
      <IconButton
        icon="delete"
        size={20}
        onPress={() => deleteAppointment(item.id)}
        style={styles.deleteIcon}
      />
    </Card>
  );

  // Date and Time picker handlers
  const handleDatePicked = (date) => {
    setNewAppointment((prevState) => ({
      ...prevState,
      date: date.toLocaleDateString(),
    }));
    setDatePickerVisible(false);
  };

  const handleTimePicked = (time) => {
    setNewAppointment((prevState) => ({
      ...prevState,
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
    setTimePickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Appointments
      </Text>

      {/* Calendar Component */}
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={{
            [newAppointment.date]: { selected: true, selectedColor: '#2260FF' },
          }}
          onDayPress={(day) => {
            setNewAppointment((prevState) => ({
              ...prevState,
              date: day.dateString,
            }));
          }}
          theme={{
            selectedDayBackgroundColor: '#2260FF',
            todayTextColor: '#2260FF',
            arrowColor: '#2260FF',
          }}
        />
      </View>

      {/* Appointments List */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointment}
        ListEmptyComponent={<Text style={styles.emptyText}>No appointments yet. Add one!</Text>}
      />

      {/* Floating Action Button for Adding Appointment */}
      <FloatingActionButton onPress={showDialog} />

      {/* Dialog for adding appointments */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Add Appointment</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={newAppointment.title}
              onChangeText={(text) => setNewAppointment({ ...newAppointment, title: text })}
              style={styles.input}
              mode="outlined"
            />
            <Text style={styles.label}>Pick a Date:</Text>
            <TextInput label="Date" value={newAppointment.date} editable={false} style={styles.input} />
            <Button onPress={() => setDatePickerVisible(true)} mode="outlined" style={styles.dateButton}>
              Select Date
            </Button>

            <Text style={styles.label}>Pick a Time:</Text>
            <TextInput label="Time" value={newAppointment.time} editable={false} style={styles.input} />
            <Button onPress={() => setTimePickerVisible(true)} mode="outlined" style={styles.dateButton}>
              Select Time
            </Button>

            <TextInput
              label="Reminder (minutes)"
              value={newAppointment.reminder}
              keyboardType="numeric"
              onChangeText={(text) => setNewAppointment({ ...newAppointment, reminder: text })}
              style={styles.input}
              mode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={addAppointment}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Date and Time Picker Modals */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDatePicked}
        onCancel={() => setDatePickerVisible(false)}
        display="spinner"
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimePicked}
        onCancel={() => setTimePickerVisible(false)}
        display="spinner"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  header: { marginBottom: 20, fontWeight: 'bold', color: '#2260FF', textAlign: 'center' },
  calendarContainer: { marginBottom: 20, backgroundColor: '#FFF', borderRadius: 10, elevation: 5 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, marginBottom: 10, borderRadius: 10, backgroundColor: '#FFF', elevation: 3 },
  cardContent: { flex: 1 },
  title: { fontWeight: 'bold', color: '#333' },
  subtitle: { color: '#666' },
  reminder: { fontStyle: 'italic', color: '#888' },
  deleteIcon: { backgroundColor: '#FFCDD2' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
  input: { marginBottom: 15 },
  label: { fontWeight: '600', marginBottom: 5, color: '#333' },
  dateButton: { marginBottom: 10 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2260FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: { color: '#FFF', fontSize: 30 },
});

export default AppointmentsScreen;
