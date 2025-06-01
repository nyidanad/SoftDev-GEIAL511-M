import { useEffect } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

import { Message } from '@/app/(tabs)/chats/[id]'

const useChatMessages = (
  chatId: string | string[] | undefined,
  setMessages: (messages: Message[]) => void
) => {
  useEffect(() => {
    if (!chatId || typeof chatId !== 'string') return

    const messagesRef = collection(db, 'chats', chatId, 'messages')
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          message: data.message,
          isSent: data.isSent,
          red: data.red,
          reactions: data.reactions,
          timestamp: data.timestamp?.toDate().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }) ?? '',
        }
      })
      setMessages(msgs)
    })

    return () => unsubscribe()
  }, [chatId, setMessages])
}

export default useChatMessages