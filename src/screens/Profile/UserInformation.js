import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { auth } from "../../constants/FireBaseConfig";
import { fetchDocumentById, updateDocument } from "../../constants/firebaseFunctions";

const getRandomColor = () => {
  const colors = ['#FFB6C1', '#FFC0CB', '#DC143C', '#FF69B4', '#FFA07A', '#FFD700', '#ADFF2F', '#20B2AA', '#87CEFA'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    profilePic: "",
    dateOfBirth: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarColor, setAvatarColor] = useState(getRandomColor());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userData = await fetchDocumentById("users", user.uid);
          setUserData(userData || {}); // Set user data
          setAvatarColor(getRandomColor()); // Set a random background color for the avatar
        } else {
          Alert.alert("Error", "No user is currently logged in.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Alert.alert("Error", "Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const saveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDocument("users", user.uid, userData); // Save changes to Firestore
        Alert.alert("Success", "Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving profile changes:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        {userData.profilePic ? (
          <Image source={{ uri: userData.profilePic }} style={styles.avatarImage} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>
              {userData.name ? userData.name.charAt(0).toUpperCase() : "A"}
            </Text>
          </View>
        )}
        <Text style={styles.profileName}>{loading ? "Loading..." : userData.name || "User"}</Text>
      </View>

      {/* Editable Profile Fields */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Profile Information</Text>

        {/* Editable Fields */}
        {["name", "email", "phoneNumber", "age", "gender", "height", "weight"].map((field) => (
          <View style={styles.inputContainer} key={field}>
            <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
            {field === "age" || field === "height" || field === "weight" ? (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(userData[field])}
                editable={isEditing}
                onChangeText={(text) => handleInputChange(field, text)}
              />
            ) : field === "gender" ? (
              <TextInput
                style={styles.input}
                value={userData[field]}
                editable={isEditing}
                onChangeText={(text) => handleInputChange(field, text)}
              />
            ) : (
              <TextInput
                style={styles.input}
                value={userData[field]}
                editable={isEditing}
                onChangeText={(text) => handleInputChange(field, text)}
              />
            )}
          </View>
        ))}

        {/* Save Changes Button */}
        <Button mode="contained" style={styles.button} onPress={saveChanges}>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "600",
    color: "#FFF",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  formContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A90E2",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
    marginTop: 5,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4A90E2",
  },
});

export default ProfileScreen;
