import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const UserDataScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [lifestyle, setLifestyle] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [otherLifestyle, setOtherLifestyle] = useState('');
  
  const saveData = () => {
    // Save Lifestyle, Medical History, and Symptoms data to Firestore
    // Add the user details to the respective Firebase collection
    console.log('Saving user data...');
    // Navigation to confirmation or home screen
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lifestyle Information</Text>
      <Picker selectedValue={lifestyle} onValueChange={(itemValue) => setLifestyle(itemValue)} style={styles.picker}>
        <Picker.Item label="Sedentary" value="Sedentary" />
        <Picker.Item label="Active" value="Active" />
        <Picker.Item label="Very Active" value="Very Active" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
      {lifestyle === 'Other' && (
        <TextInput
          value={otherLifestyle}
          onChangeText={setOtherLifestyle}
          placeholder="Describe your lifestyle"
          style={styles.input}
        />
      )}

      <Text style={styles.header}>Exercise Frequency</Text>
      <Picker selectedValue={exerciseFrequency} onValueChange={(itemValue) => setExerciseFrequency(itemValue)} style={styles.picker}>
        <Picker.Item label="Never" value="Never" />
        <Picker.Item label="Once a week" value="Once a week" />
        <Picker.Item label="2-3 times a week" value="2-3 times a week" />
        <Picker.Item label="4-5 times a week" value="4-5 times a week" />
      </Picker>

      {/* Medical History & Symptoms Sections (Similar UI) */}

      <Button title="Save and Continue" onPress={saveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default UserDataScreen;
