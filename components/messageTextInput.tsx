import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Message } from '@/app/(tabs)/chats/[id]';
import { User } from '@firebase/auth';

type messageTextInputProps = {
  current_user_id: string | undefined;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

const messageTextInput = ({ current_user_id, messages, setMessages }: messageTextInputProps) => {
  const [inputText, setInputText] = useState('');

  // Handle when pressing send
  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: uuid.v4().toString(),
      message: inputText.trim(),
      isSent: current_user_id,  // string UID
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      red: false,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  // Handle when pressing mic
  const handleMic = () => {
    // Mic logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="add-circle-outline" style={[styles.icon, { fontSize: 28 }]} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Start typing here..."
        placeholderTextColor="#999999"
        multiline
      />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity>
          <MaterialIcons name="insert-emoticon" style={[styles.icon, { marginRight: 8 }]} />
        </TouchableOpacity>

        {inputText.trim().length > 0 ? (
          <TouchableOpacity onPress={handleSend}>
            <Ionicons name="send" style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleMic}>
            <Ionicons name="mic-outline" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default messageTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopColor: '#E5E5EA',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    color: '#363636',
    borderColor: '#E5E5EA',
    borderWidth: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  icon: {
    color: '#11175A',
    fontSize: 26,
  },
});
