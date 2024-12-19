import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { format } from 'date-fns'; // Utility for date formatting

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello, how can I assist you today?', timestamp: new Date() },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Format the timestamp for a message
  const formatTimestamp = (date) => format(date, 'p');

  // API call to fetch AI response
  const fetchAIResponse = async (userMessage) => {
    try {
      const response = await fetch('https://chatgpt4-api.p.rapidapi.com/ping', {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'chatgpt4-api.p.rapidapi.com',
          'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY', // Replace with your API key
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      return data.reply || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Error communicating with AI:', error);
      Alert.alert('Error', 'Failed to fetch AI response. Please try again.');
      return null;
    }
  };

  // Handle sending the message
  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim()) return; // Prevent sending empty messages

    // Add user message to chat with timestamp
    const userMessage = { sender: 'User', text: inputText, timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText(''); // Clear input field

    setLoading(true);

    const aiReply = await fetchAIResponse(userMessage);
    if (aiReply) {
      // Add AI response to chat with timestamp
      const aiMessage = { sender: 'AI', text: aiReply, timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }

    setLoading(false);
  }, [inputText]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text variant="headlineMedium" style={styles.header}>
        Chat with Dr. GPT
      </Text>

      <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.sender === 'User' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(message.timestamp)}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="small" color="#2260FF" />}
      </ScrollView>

      <TextInput
        value={inputText}
        onChangeText={setInputText}
        placeholder="Ask Your Doctor GPT..."
        style={styles.input}
        multiline
        numberOfLines={4}
      />
      <Button
        mode="contained"
        onPress={handleSendMessage}
        style={styles.sendButton}
        disabled={loading}
      >
        Send
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontWeight: 'bold',
    color: '#2260FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  chatContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2260FF',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
  },
  timestamp: {
    position: 'absolute',
    bottom: -20,
    right: 0,
    fontSize: 10,
    color: '#B0B0B0',
  },
  input: {
    marginBottom: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    textAlignVertical: 'top', // Ensures text aligns at the top on iOS for multiline input
  },
  sendButton: {
    backgroundColor: '#2260FF',
    borderRadius: 25,
    marginBottom: 50,
  },
});

export default ChatScreen;
