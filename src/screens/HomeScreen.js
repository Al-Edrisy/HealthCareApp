import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Text, IconButton, Card, FAB } from 'react-native-paper';
import BottomNavigation from '../components/BottomNavigation'; // Import the BottomNavigation component

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([
    "Healthy Eating", "Stress Management", "Benefits of Yoga"
  ]);
  const [selectedCard, setSelectedCard] = useState(null); // Track which card is clicked
  const scrollViewRef = useRef(null);
  const [isCardVisible, setCardVisible] = useState(false);
  
  // For auto-scrolling Health Tips
  const healthTipsData = [
    { title: "Drink Water", description: "Stay hydrated by drinking enough water throughout the day.", color: '#64B5F6' },
    { title: "Exercise Regularly", description: "Engage in physical activity for at least 30 minutes a day.", color: '#81C784' },
    { title: "Get Enough Sleep", description: "A good night’s sleep improves your overall health.", color: '#FFEB3B' },
    { title: "Eat Healthy", description: "Consume a balanced diet that includes fruits and vegetables.", color: '#FF7043' },
  ];

  useEffect(() => {
    // Hide quote after 5 seconds
    const timer = setTimeout(() => {
      setQuoteVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    const filtered = ["Healthy Eating", "Stress Management", "Benefits of Yoga"].filter(article =>
      article.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredArticles(filtered);
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
        {/* Quote Section */}
        {quoteVisible && (
          <Card style={styles.quoteCard}>
            <Text style={styles.quoteText}>"The greatest wealth is health." – Virgil</Text>
          </Card>
        )}

        {/* Quick Links */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>Healthcare Services</Text>
        <View style={styles.quickLinksContainer}>
          {[
            { icon: 'chat', title: 'Dr. ChatGPT', screen: 'ChatScreen' },
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
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.healthTipsContainer}
          contentContainerStyle={{ flexDirection: 'row' }}
        >
          {healthTipsData.map((tip, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardClick({ title: tip.title, content: tip.description })}>
              <Card style={[styles.healthTipCard, { backgroundColor: tip.color }]}>
                <Text style={styles.healthTipTitle}>{tip.title}</Text>
                <Text style={styles.healthTipDescription}>{tip.description}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Articles Section */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>Trending Articles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.articlesContainer}>
          {filteredArticles.length > 0 && filteredArticles.map((article, index) => (
            <TouchableOpacity key={index} onPress={() => handleCardClick({ title: article, content: "Article content for " + article })}>
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
      {isCardVisible === false && <BottomNavigation navigation={navigation} />}

      {/* Emergency Button */}
      {isCardVisible === false && (
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
    backgroundColor: '#E8F8F5', // Light and clean background color
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
