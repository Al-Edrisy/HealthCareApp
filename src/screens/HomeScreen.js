
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TextInput, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { Text, IconButton, Card, FAB, Menu, Divider } from 'react-native-paper';
import Colors from '../constants/Colors';
import axios from 'axios';


const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1)); // Animation for fading out
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([ "Healthy Eating", "Stress Management", "Benefits of Yoga" ]);
  const [healthTipsData, setHealthTipsData] = useState([]); // For health tips
  const [loadingHealthTips, setLoadingHealthTips] = useState(true); // Loading state for health tips

  // Fetch health tips data (API)
  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        const userId = 'users/JjgSQE3IEhlhQxYsEhyw'; // Sample userId
        const response = await axios.get(`https://your-backend-url.com/healthTips/getHealthTips`, {
          params: { userId },
        });

        if (response.data && Array.isArray(response.data.tips)) {
          setHealthTipsData(response.data.tips);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching health tips:", error);
      } finally {
        setLoadingHealthTips(false);
      }
    };

    fetchHealthTips();
  }, []);

  // Function to toggle menu visibility
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    const filtered = ["Healthy Eating", "Stress Management", "Benefits of Yoga"].filter(article =>
      article.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
    closeMenu(); // Close the menu after navigation
  };

  const handleEmergency = () => {
    navigation.navigate('EmergencyScreen');
  };


  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {/* Profile Icon */}
          <IconButton
            icon="account"
            size={60}  // Increased size for profile icon
            style={styles.profileIcon}
            onPress={() => navigation.navigate('ProfileScreen')}
          />
          
          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearchChange}
          />

          {/* Notification Icon */}
          <IconButton
            icon="bell"
            size={25}
            style={styles.notificationIcon}
            onPress={() => navigation.navigate('NotificationScreen')}
          />
          
          {/* Menu Button */}
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" size={30} onPress={openMenu} />}
            style={styles.menu}
          >
            <Menu.Item onPress={() => handleNavigation('SettingsScreen')} title="Settings" />
            <Menu.Item onPress={() => handleNavigation('ProfileScreen')} title="Profile" />
            <Menu.Item onPress={() => handleNavigation('MedicalLibraryScreen')} title="Medical Library" />
            <Menu.Item onPress={() => handleNavigation('FirstAidScreen')} title="First Aid" />
            <Menu.Item onPress={() => handleNavigation('NotificationScreen')} title="Notifications" />
            <Divider />
            <Menu.Item onPress={() => handleNavigation('EmergencyScreen')} title="Emergency" />
          </Menu>
        </View>
        <Text variant="headlineLarge" style={styles.headerText}>Good Morning, Adnan!</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Let’s prioritize your health today.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}> 
        {/* Animated Quote Section */}
        {quoteVisible && (
          <Animated.View style={[styles.quoteCard, { opacity: fadeAnim }]} >
            <Text style={styles.quoteText}>"The greatest wealth is health." – Virgil</Text>
          </Animated.View>
        )}

        {/* Quick Links */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>Healthcare Services</Text>
        <View style={styles.quickLinksContainer}>
           {[ 
            { icon: 'chat', title: 'Dr.GPT', screen: 'DR.GPT' },
            { icon: 'heart', title: 'Health Records', screen: 'HealthTipsScreen' },
            { icon: 'hospital-building', title: 'Nearby Hospitals', screen: 'Nearby Hospitals' },
          ].map((item, index) => (
            <Card key={index} style={styles.quickLinkCard} onPress={() => navigation.navigate(item.screen)}>
              <IconButton icon={item.icon} size={40} style={styles.quickLinkIcon} />
              <Text style={styles.quickLinkText}>{item.title}</Text>
            </Card>
          ))} 
        </View>

        {/* Health Tips Section */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>Health Tips</Text>
        {loadingHealthTips ? (
          <ActivityIndicator size="large" color={Colors.primary} style={styles.loadingIndicator} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.healthTipsContainer}>
            {healthTipsData.length > 0 ? (
              healthTipsData.map((tip, index) => (
                <TouchableOpacity key={index} onPress={() => console.log(tip)}>
                  <Card style={[styles.healthTipCard, { backgroundColor: tip.color }]} >
                    <Text style={styles.healthTipTitle}>{tip.title}</Text>
                    <Text style={styles.healthTipDescription}>{tip.description}</Text>
                  </Card>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No health tips available</Text>
            )}
          </ScrollView>
        )}

        {/* Trending Articles Section */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>Trending Articles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.articlesContainer}>
          {filteredArticles.map((article, index) => (
            <TouchableOpacity key={index}>
              <Card style={styles.articleCard}>
                <Text style={styles.articleText}>{article}</Text>
                <Text style={styles.articleDescription}>Read more about {article}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Emergency Button */}
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
    backgroundColor: '#F0F4F8',
  },
  header: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 65,
    paddingHorizontal: 20,
    paddingRight: 10,
    paddingLeft: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu: {
    position: 'absolute',
    top: 125, // Adjusted for better positioning
    right: 15, // Ensures it's well placed at the top right
    left: 125,
  },
  headerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 32,
  },
  subtitle: {
    color: '#D0D9FF',
    fontSize: 16,
    marginTop: 5,
  },
  profileIcon: {
    backgroundColor: '#FFFFFF33',
  },
  notificationIcon: {
    backgroundColor: '#FFFFFF33',
  },
  searchBar: {
    height: 40,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 5,
    width: '45%',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 170,
  },
  quoteCard: {
    backgroundColor: '#F9FAF8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#2D5C2E',
    textAlign: 'center',
  },
  sectionHeader: {
    fontWeight: '700',
    fontSize: 22,
    color: '#333',
    marginBottom: 10,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quickLinkCard: {
    width: 110,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F5FF',
    borderRadius: 15,
    padding: 10,
  },
  quickLinkIcon: {
    backgroundColor: '#D7E9F7',
    marginBottom: 10,
  },
  quickLinkText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  healthTipsContainer: {
    marginTop: 20,
  },
  healthTipCard: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginRight: 15,
  },
  healthTipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 10,
  },
  healthTipDescription: {
    fontSize: 14,
    color: '#2C3E50',
    textAlign: 'left',
  },
  articlesContainer: {
    marginTop: 20,
  },
  articleCard: {
    width: 300,
    height: 120,
    justifyContent: 'center',
    marginRight: 15,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#D2DDFA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500',
  },
  articleDescription: {
    fontSize: 14,
    color: '#34495E',
    marginTop: 10,
  },
  emergencyButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FF4C4C',
    borderRadius: 50,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default HomeScreen;
