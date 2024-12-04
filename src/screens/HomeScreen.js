import React, { useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Text, IconButton, Card, Menu, FAB } from 'react-native-paper';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const scrollViewRef = useRef(null); // Create a reference for ScrollView

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleEmergency = () => {
    navigation.navigate('EmergencyScreen');
  };

  // Scroll to the right after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        // Scroll to the right by 300 units (adjust this based on your content)
        scrollViewRef.current.scrollTo({ x: 325, animated: true });
      }
    }, 3000); // 5 seconds delay

    // Cleanup the timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {/* Profile Button */}
          <IconButton
            icon="account"
            size={30}
            style={styles.profileIcon}
            onPress={() => navigation.navigate('ProfileScreen')}
          />

          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor="#999"
          />

          {/* Notification Button */}
          <IconButton
            icon="bell"
            size={30}
            style={styles.notificationIcon}
            onPress={() => navigation.navigate('NotificationsScreen')}
          />
        </View>

        <Text variant="headlineLarge" style={styles.headerText}>
          Hello, John!
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Let’s prioritize your health today.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Health Tips Scrollable Section */}
        <Text variant="headlineSmall" style={styles.healthTipsHeader}>
          Health Tips
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.healthTipsContainer}
          ref={scrollViewRef} // Attach the ref to ScrollView
        >
          <Card style={styles.healthTipCard}>
            <Text style={styles.healthTipText}>Drink 8 glasses of water daily</Text>
          </Card>
          <Card style={styles.healthTipCard}>
            <Text style={styles.healthTipText}>Exercise for 30 minutes each day</Text>
          </Card>
          <Card style={styles.healthTipCard}>
            <Text style={styles.healthTipText}>Get 7-8 hours of sleep each night</Text>
          </Card>
          <Card style={styles.healthTipCard}>
            <Text style={styles.healthTipText}>Eat a balanced diet with fruits and vegetables</Text>
          </Card>
        </ScrollView>

      </ScrollView>

      {/* Floating Bottom Navigation */}
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

      {/* Emergency Floating Button */}
      <FAB
        style={styles.emergencyButton}
        icon="phone"
        label="Emergency"
        color="#FFF"
        onPress={handleEmergency}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#2260FF',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#D0D9FF',
    marginTop: 5,
  },
  profileIcon: {
    backgroundColor: '#FFFFFF33',
  },
  notificationIcon: {
    backgroundColor: '#FFFFFF33',
  },
  searchBar: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    fontSize: 16,
  },
  scrollContent: {
    padding: 20,
  },
  healthTipsHeader: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 18,
  },
  healthTipsContainer: {
    margin: 10,
    padding: 20,
    paddingLeft: 8,


  },
  healthTipCard: {
    width: 310,
    marginRight: 15,
    height: 100,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: "center",
  },
  healthTipText: {
    fontSize: 16,
    color: '#2260FF',
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    marginBottom: 15,
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    marginBottom: 10,
    backgroundColor: '#E8F0FE',
  },
  cardText: {
    color: '#2260FF',
    fontWeight: '600',
    textAlign: 'center',
  },
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
  emergencyButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#FF4D4D',
    elevation: 6,
  },
});

export default HomeScreen;
