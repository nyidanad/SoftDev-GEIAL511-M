import React, { useState, useRef, useEffect } from 'react'
import { FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native'

import MessageBubble from '@/components/messageBubble'
import MessageTextInput from '@/components/messageTextInput'

// (replace with actual user ID from auth later !!!)
const CURRENT_USER_ID = 'currentUser123'

export type Message = {
  id: string
  text: string
  senderId: string
  timestamp: string
  red?: boolean
  reactions?: string[]
}

const msgData: Message[] = [
  {
    id: '1',
    text: "I've been good, just super busy with work. What about you?",
    senderId: CURRENT_USER_ID,
    timestamp: '10:52',
    red: true,
  },
  {
    id: '2',
    text: "Same here! Work's been crazy, but I'm surviving. You still at that software engineer job?",
    senderId: 'johnWilliams456',
    timestamp: '10:56',
    red: true,
  },
  {
    id: '3',
    text: 'Ugh, yeah...',
    senderId: CURRENT_USER_ID,
    timestamp: '10:58',
    red: true,
  },
  {
    id: '4',
    text: "But I'm thinking of switching soon. I need something more exciting!",
    senderId: CURRENT_USER_ID,
    timestamp: '11:00',
    red: true,
  },
  {
    id: '5',
    text: "Ooooh, any ideas on what's next?",
    senderId: 'johnWilliams456',
    timestamp: '11:07',
    red: true,
  },
  {
    id: '6',
    text: 'Maybe something adventurous?',
    senderId: 'johnWilliams456',
    timestamp: '11:07',
    red: true,
  },
  {
    id: '7',
    text: 'Honestly, thinking of starting my own business. Maybe a small café! ☕️✨',
    senderId: CURRENT_USER_ID,
    timestamp: '11:13',
    red: true,
  },
  {
    id: '8',
    text: 'That sounds AMAZING! 😍 You always had a thing for coffee and aesthetics.',
    senderId: 'johnWilliams456',
    timestamp: '11:17',
    red: true,
  },
  {
    id: '9',
    text: 'I just need an official taste tester... interested? 😉',
    senderId: CURRENT_USER_ID,
    timestamp: '11:17',
    red: true,
  },
  {
    id: '10',
    text: 'Uh, duh! Unlimited coffee? Say no more! When do we start?',
    senderId: 'johnWilliams456',
    timestamp: '11:18',
    red: true,
  },
  {
    id: '11',
    text: 'Soon.. very soon.',
    senderId: CURRENT_USER_ID,
    timestamp: '11:20',
    red: false,
  },
];


const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>(msgData)
  const flatListRef = useRef<FlatList<Message>>(null)

  // Scroll to bottom when new messages are added or keyboard shows
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages])

  // Render content for FlatList
  const renderItem = ({ item }: { item: Message }) => (
    <MessageBubble
      message={item.text}
      isSent={item.senderId === CURRENT_USER_ID}
      timestamp={item.timestamp}
      red={item.red}
    />
  )

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <FlatList
        style={styles.list}
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 10 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <MessageTextInput current_user_id={CURRENT_USER_ID} messages={messages} setMessages={setMessages} />
    </KeyboardAvoidingView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
