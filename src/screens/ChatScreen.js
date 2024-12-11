import React from 'react';
import { View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Chat with Dr. GPT
      </Text>
      
      <ScrollView style={styles.chatContainer}>
        {/* Chat messages would be displayed here */}
        <View style={styles.messageBubble}>
          <Text variant="bodyLarge">Hello, how can I assist you today?</Text>
        </View>
      </ScrollView>

      <TextInput
        label="Type your message"
        mode="outlined"
        style={styles.input}
      />
      <Button title="Send" onPress={() => {}} style={styles.sendButton} />
    </View>
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
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    backgroundColor: '#2260FF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    maxWidth: '80%',
  },
  input: {
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#2260FF',
  },
});

export default ChatScreen;
