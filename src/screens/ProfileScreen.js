import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Text, Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    medicalHistory: false,
    lifestyle: false,
    symptoms: false,
  });

  const [profileInfo, setProfileInfo] = useState({
    // Personal Information
    name: 'Jane Doe',
    gender: 'Female',
    dateOfBirth: '1990-01-01',
    email: 'jane.doe@example.com',
    phone: '+123 456 7890',
    height: '170 cm',
    weight: '65 kg',
    smokes: false,
    drinksAlcohol: false,
    avatar: 'https://via.placeholder.com/100', // Default avatar

    // Medical History
    userId: '123456',
    chronicDiseases: 'None',
    allergies: 'None',
    medications: 'None',
    surgicalHistory: 'None',
    familyHistory: 'None',

    // Lifestyle
    exerciseFrequency: 'Daily',
    dietType: 'Balanced',
    lifestyleNotes: 'No additional notes',

    // Symptoms
    symptomList: 'None',
  });

  const handleInputChange = (key, value) => {
    setProfileInfo({ ...profileInfo, [key]: value });
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need access to your photos to set a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileInfo({ ...profileInfo, avatar: result.assets[0].uri });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <Avatar.Image size={100} source={{ uri: profileInfo.avatar }} />
        {isEditing && (
          <IconButton
            icon="camera"
            size={20}
            style={styles.cameraButton}
            onPress={pickImage}
          />
        )}
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {['name', 'gender', 'dateOfBirth', 'email', 'phone', 'height', 'weight'].map((field) => (
          <View style={styles.fieldContainer} key={field}>
            <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}</Text>
            <TextInput
              style={styles.input}
              editable={isEditing}
              value={profileInfo[field]}
              onChangeText={(text) => handleInputChange(field, text)}
            />
          </View>
        ))}
        {/* Smokes and Drinks */}
        {['smokes', 'drinksAlcohol'].map((field) => (
          <View style={styles.switchContainer} key={field}>
            <Text style={styles.label}>
              {field === 'smokes' ? 'Smokes?' : 'Drinks Alcohol?'}
            </Text>
            <Switch
              value={profileInfo[field]}
              onValueChange={(value) => handleInputChange(field, value)}
              disabled={!isEditing}
            />
          </View>
        ))}
      </View>

      {/* Medical History */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('medicalHistory')}>
          <Text style={styles.sectionTitle}>Medical History</Text>
        </TouchableOpacity>
        {expandedSections.medicalHistory && (
          <>
            {[
              'userId',
              'chronicDiseases',
              'allergies',
              'medications',
              'surgicalHistory',
              'familyHistory',
            ].map((field) => (
              <View style={styles.fieldContainer} key={field}>
                <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}</Text>
                <TextInput
                  style={styles.input}
                  editable={isEditing}
                  value={profileInfo[field]}
                  onChangeText={(text) => handleInputChange(field, text)}
                />
              </View>
            ))}
          </>
        )}
      </View>

      {/* Lifestyle */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('lifestyle')}>
          <Text style={styles.sectionTitle}>Lifestyle</Text>
        </TouchableOpacity>
        {expandedSections.lifestyle && (
          <>
            {['exerciseFrequency', 'dietType', 'lifestyleNotes'].map((field) => (
              <View style={styles.fieldContainer} key={field}>
                <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}</Text>
                <TextInput
                  style={styles.input}
                  editable={isEditing}
                  value={profileInfo[field]}
                  onChangeText={(text) => handleInputChange(field, text)}
                />
              </View>
            ))}
          </>
        )}
      </View>

      {/* Symptoms */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('symptoms')}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
        </TouchableOpacity>
        {expandedSections.symptoms && (
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Symptom List</Text>
            <TextInput
              style={styles.input}
              editable={isEditing}
              value={profileInfo.symptomList}
              onChangeText={(text) => handleInputChange('symptomList', text)}
            />
          </View>
        )}
      </View>

      {/* Edit/Save Button */}
      <Button mode="contained" style={styles.button} onPress={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save Changes' : 'Edit Profile'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ddd',
  },
  section: {
    width: '100%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2260FF',
  },
});

export default ProfileScreen;
