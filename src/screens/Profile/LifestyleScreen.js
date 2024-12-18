import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { Avatar, Text, Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { fetchDocumentById, updateDocument } from '../../constants/firebaseFunctions'; // Firebase functions
import { auth } from '../../constants/FireBaseConfig'; // Firebase Auth configuration

const LifestyleScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    
    dietType: 'Vegetarian',
    maritalStatus: 'Single',
    dominantFoot: 'Right',
    dominantHand: 'Left',
    excerciseFrequency: 'Daily',
    selfEsteem: 'High',
    screenTime: '4 Hours',
    sleepHours: '0',
    notes: '....',
    smokes: false,
    drinksAlcohol: false,
    Avatar: 'https://via.placeholder.com/100',
  });

  useEffect(() => {
    const fetchLifestyleData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const lifestyleData = await fetchDocumentById('lifestyle', userId);
        if (lifestyleData) {
          setProfileInfo(lifestyleData);
        }
      } catch (error) {
        console.error('Error fetching lifestyle data:', error);
      }
    };

    fetchLifestyleData();
  }, []);

  const handleInputChange = (key, value) => {
    setProfileInfo({ ...profileInfo, [key]: value });
  };

  const saveChanges = async () => {
    try {
      const userId = auth.currentUser.uid; // Get the current user's ID
      await updateDocument('lifestyle', userId, profileInfo); // Update Firestore document
      Alert.alert('Success', 'Lifestyle information updated successfully!');
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating lifestyle data:', error);
      Alert.alert('Error', 'Failed to update lifestyle information. Please try again.');
    }
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
      setProfileInfo({ ...profileInfo, Avatar: result.assets[0].uri });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <Avatar.Image size={100} source={{ uri: profileInfo.Avatar }} />
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
        <Text style={styles.sectionTitle}>Lifestyle Information</Text>
        {['dietType', 'maritalStatus', 'dominantFoot', 'dominantHand', 'excerciseFrequency', 'selfEsteem', 'screenTime', 'sleepHours', 'notes'].map((field) => (
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

      {/* Edit and Save Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            if (isEditing) {
              saveChanges();
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </View>
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
    color: '#2260FF',
    fontSize: 17,
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
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    marginBottom: 10,
    backgroundColor: '#2260FF',
  },
});

export default LifestyleScreen;
