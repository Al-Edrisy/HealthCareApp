// src/components/BottomNavigation.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

const BottomNavigation = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={styles.bottomNavigation}>
      <IconButton
        icon="home"
        size={40}
        style={styles.bottomIcon}
        onPress={() => navigation.navigate('HomeScreen')}
      />
      <IconButton
        icon="calendar"
        size={40}
        style={styles.bottomIcon}
        onPress={() => navigation.navigate('AppointmentsScreen')}
      />
      <IconButton
        icon="pill"
        size={40}
        style={styles.bottomIcon}
        onPress={() => navigation.navigate('PrescriptionsScreen')}
      />
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="menu"
            size={40}
            style={styles.bottomIcon}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('LabResultsScreen');
          }}
          title="Lab Results"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('InsuranceScreen');
          }}
          title="Insurance Info"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('FindDoctorScreen');
          }}
          title="Find a Doctor"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('ChatScreen');
          }}
          title="Chat with Dr.GPT"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('SettingsScreen');
          }}
          title="Settings"
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  bottomIcon: {
    backgroundColor: '#DBEAFE',
  },
});

export default BottomNavigation;
