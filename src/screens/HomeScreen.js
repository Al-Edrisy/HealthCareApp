import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TextInput, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { Text, IconButton, Card, FAB } from 'react-native-paper';
import BottomNavigation from '../components/BottomNavigation'; // Import the BottomNavigation component
import Colors from '../constants/Colors';
import axios from 'axios'; // Import axios to handle HTTP requests

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1)); // Animation for fading out
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([
    "Healthy Eating", "Stress Management", "Benefits of Yoga",
  ]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardVisible, setCardVisible] = useState(false);
  const [healthTipsData, setHealthTipsData] = useState([]); // For health tips
  const [loadingHealthTips, setLoadingHealthTips] = useState(true); // Loading state for health tips
  const scrollViewRef = useRef(null);

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const healthTipsRef = useRef(null);

  // Fetch user data from Firestore and check the health tips update status
  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        // Fetch user data from Firestore (you may need to adjust this based on your Firestore structure)
        const userId = 'users/JjgSQE3IEhlhQxYsEhyw'; // Sample userId, replace with actual
        const response = await axios.get(`https://your-backend-url.com/healthTips/getHealthTips`, {
          params: { userId },
        });

        // Ensure that the response contains a valid `tips` array
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
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % healthTipsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [healthTipsData]);

  useEffect(() => {
    if (healthTipsRef.current && healthTipsData.length > 0) {
      healthTipsRef.current.scrollTo({
        x: currentTipIndex * (width - 40),
        animated: true,
      });
    }
  }, [currentTipIndex, healthTipsData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setQuoteVisible(false));
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    try {
      const filtered = ["Healthy Eating", "Stress Management", "Benefits of Yoga"].filter(article =>
        article.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredArticles(filtered);
    } catch (error) {
      console.error("Error filtering articles:", error);
    }
  };

  const handleCardClick = (cardContent) => {
    setSelectedCard(cardContent);
    setCardVisible(true);
  };

  const handleOutsideClick = () => {
    setCardVisible(false);
    setSelectedCard(null);
  };

  const handleEmergency = () => {
    navigation.navigate('EmergencyScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <IconButton 
            icon="account" 
            size={30} 
            style={styles.profileIcon} 
            onPress={() => navigation.navigate('ProfileScreen')} 
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          <IconButton 
            icon="bell" 
            size={30} 
            style={styles.notificationIcon} 
            onPress={() => navigation.navigate('NotificationsScreen')} 
          />
        </View>
        <Text variant="headlineLarge" style={styles.headerText}>Good Morning, John!</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Let’s prioritize your health today.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        {/* Animated Quote Section */}
        {quoteVisible && (
          <Animated.View style={[styles.quoteCard, { opacity: fadeAnim }]}>
            <Text style={styles.quoteText}>"The greatest wealth is health." – Virgil</Text>
          </Animated.View>
        )}

        {/* Quick Links */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>Healthcare Services</Text>
        <View style={styles.quickLinksContainer}>
          {[
            { icon: 'chat', title: 'Dr.GPT', screen: 'ChatScreen' },
            { icon: 'heart', title: 'Health Records', screen: 'HealthRecordsScreen' },
            { icon: 'hospital-building', title: 'Nearby Hospitals', screen: 'NearbyHospitalsScreen' },
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
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.healthTipsContainer}
            ref={healthTipsRef}
          >
            {healthTipsData.length > 0 ? (
              healthTipsData.map((tip, index) => (
                <TouchableOpacity key={index} onPress={() => handleCardClick({ title: tip.title, content: tip.description })}>
                  <Card style={[styles.healthTipCard, { backgroundColor: tip.color }]}>
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
            <TouchableOpacity key={index} onPress={() => handleCardClick({ title: article, content: `Article content for ${article}` })}>
              <Card style={styles.articleCard}>
                <Text style={styles.articleText}>{article}</Text>
                <Text style={styles.articleDescription}>Read more about {article}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Card Content Display */}
      {isCardVisible && selectedCard && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={handleOutsideClick} 
        >
          <Card style={styles.expandedCard}>
            <Text style={styles.expandedCardTitle}>{selectedCard.title}</Text>
            <Text style={styles.expandedCardDescription}>{selectedCard.content}</Text>
          </Card>
        </TouchableOpacity>
      )}

      {/* Bottom Navigation */}
      {!isCardVisible && <BottomNavigation navigation={navigation} />}

      {/* Emergency Button */}
      {!isCardVisible && (
        <FAB 
          style={styles.emergencyButton} 
          icon="phone" 
          label="Emergency" 
          color="#FFF" 
          onPress={handleEmergency} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 50,
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
    fontSize: 30,
  },
  subtitle: {
    color: '#D0D9FF',
    marginTop: 5,
    fontSize: 16,
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
    paddingBottom: 170, // Adjusted padding to provide space at the bottom (you can modify this later)
  },
  quoteCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#E9F7EF',
    borderRadius: 15,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#2D5C2E',
    textAlign: 'center',
  },
  sectionHeader: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 22,
    color: '#333',
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
    backgroundColor: '#F0F8FF',
    borderRadius: 15,
  },
  quickLinkIcon: {
    backgroundColor: '#D7E9F7',
    marginBottom: 10,
    justifyContent: 'center',
  },
  quickLinkText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  healthTipsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  healthTipCard: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginRight: 15, // Added margin between the cards
  },
  healthTipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 10, // Space between title and description
  },
  healthTipDescription: {
    fontSize: 14,
    color: '#2C3E50',
    textAlign: 'left', // Aligned text to the left
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
    backgroundColor: '#D2DDFA', // Light and clean background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    
  },
  articleText: {
    fontSize: 18,
    color: '#2C3E50', // Darker text for better contrast
    fontWeight: '500',
  },
  articleDescription: {
    fontSize: 14,
    color: '#34495E',
    marginTop: 5, // Added margin between title and description
  },
  expandedCard: {
    width: width - 40,
    justifyContent: 'center',
    height: 300,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  expandedCardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
  },
  expandedCardDescription: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'left',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#FF4F77',
  },
});

export default HomeScreen;
