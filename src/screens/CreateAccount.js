import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CountryPicker } from 'react-native-country-picker-modal';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../constants/FireBaseConfig'; // Import Firebase auth

// CreateAccount Component
const CreateAccount = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
  // Validate input fields
  const validateForm = () => {
    if (!email || !password || !confirmPassword || !mobileNumber || !dateOfBirth) {
      Alert.alert('Validation Error', 'All fields are required!');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match!');
      return false;
    }
    return true;
  };

  // Handle account creation
  const handleCreateAccount = async () => {
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created:', userCredential);
        
        // Proceed to next screen with user details
        navigation.navigate('UserDataScreen', { userId: userCredential.user.uid });
      } catch (error) {
        console.error('Error creating user:', error);
        Alert.alert('Error', error.message);
      }
    }
  };

  const onCountrySelect = (country) => {
    setCountryCode(country.cca2);
    setPhoneCode(country.callingCode[0]);
  };

  // Show and hide the date picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  
  const handleConfirmDate = (date) => {
    setDateOfBirth(date.toLocaleDateString());
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      {/* Email */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Password */}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      {/* Confirm Password */}
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
      />

      {/* Phone Number */}
      <View style={styles.phoneContainer}>
        <CountryPicker
          withFlag
          withCallingCode
          countryCode={countryCode}
          onSelect={onCountrySelect}
          containerButtonStyle={styles.countryPickerButton}
        />
        <Text style={styles.phoneCode}>+{phoneCode}</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {/* Date of Birth */}
      <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
        <Text style={styles.dateText}>
          {dateOfBirth ? dateOfBirth : 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      {/* Create Account Button */}
      <Button title="Create Account" onPress={handleCreateAccount} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryPickerButton: {
    flex: 1,
  },
  phoneCode: {
    fontSize: 18,
    marginRight: 10,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 18,
    color: dateOfBirth ? '#000' : '#ccc',
  },
});

export default CreateAccount;
 