import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAI } from '@/hooks/useAI';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { loading, error, result, callAI } = useAI();

  useEffect(() => {
    if (result?.text) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: result.text, sender: 'ai' }]);
    }
  }, [result]);

  const onSubmit = () => {
    if (!prompt.trim()) return;
    const userText = prompt.trim();
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: userText, sender: 'user' }]);
    setPrompt('');
    callAI(userText);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
      <Text style={item.sender === 'user' ? styles.userText : styles.aiText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>SNAP Assistant</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatList}
      />
      {loading && <ActivityIndicator style={{ marginVertical: 8 }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask about benefits, meal plans..."
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!prompt.trim() || loading) && styles.sendBtnDisabled]}
          onPress={onSubmit}
          disabled={loading || !prompt.trim()}
        >
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 16, textAlign: 'center', color: '#1a1a1a' },
  chatList: { paddingBottom: 16 },
  messageBubble: { padding: 12, borderRadius: 16, marginBottom: 10, maxWidth: '80%' },
  userBubble: { backgroundColor: '#1B5E20', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: '#E5E5EA', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  userText: { color: '#fff', fontSize: 16 },
  aiText: { color: '#000', fontSize: 16 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
    backgroundColor: '#fff',
  },
  sendBtn: { backgroundColor: '#1B5E20', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20, justifyContent: 'center' },
  sendBtnDisabled: { opacity: 0.5 },
  sendBtnText: { color: '#fff', fontWeight: '600' },
  error: { color: 'red', textAlign: 'center', marginBottom: 8 },
});
