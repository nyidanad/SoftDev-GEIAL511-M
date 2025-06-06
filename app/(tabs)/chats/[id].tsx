import React, { useState, useRef, useEffect } from 'react'
import { FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useGlobalSearchParams } from 'expo-router'

import MessageBubble from '@/components/messageBubble'
import MessageTextInput from '@/components/messageTextInput'

import { getAuth } from 'firebase/auth'
import useChatMessages from '@/hooks/useChatMessages'

export type Message = {
  id: string
  message: string
  isSent: string | undefined
  timestamp: string
  red?: boolean
  reactions?: string[]
}

const ChatScreen = () => {
  const auth = getAuth()
  const CURRENT_USER_ID = auth.currentUser?.uid
  const { id } = useGlobalSearchParams()    // chatId

  const [messages, setMessages] = useState<Message[]>([])
  const flatListRef = useRef<FlatList<Message>>(null)


  // Fetching messages for specific chat
  useChatMessages(id, setMessages)


  // Scroll to bottom when new messages are added or keyboard shows
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true })
    }
  }, [messages])


  // Render content for FlatList
  const renderItem = ({ item }: { item: Message }) => (
    <MessageBubble
      message={item.message}
      isSent={item.isSent === CURRENT_USER_ID}
      timestamp={item.timestamp}
      red={item.red}
    />
  )

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} >
      <FlatList
        style={styles.list}
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <MessageTextInput current_user_id={CURRENT_USER_ID} />
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
})