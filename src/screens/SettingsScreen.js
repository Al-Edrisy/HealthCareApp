import React from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import { List } from 'react-native-paper';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>Settings</Text>

      <List.Section style={styles.section}>
        <List.Item
          title="Enable Notifications"
          right={() => <Switch value={true} onValueChange={() => {}} />}
        />
        <List.Item
          title="Change Password"
          onPress={() => {}}
        />
        <List.Item
          title="Privacy Settings"
          onPress={() => {}}
        />
      </List.Section>

      <List.Section style={styles.section}>
        <List.Item
          title="Logout"
          onPress={() => {}}
          style={styles.logoutItem}
        />
      </List.Section>
    </View>
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
  section: {
    marginBottom: 20,
  },
  logoutItem: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    borderRadius: 10,
  },
});

export default SettingsScreen;
