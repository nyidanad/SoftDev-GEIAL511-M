import { collection, query, orderBy, getDocs } from 'firebase/firestore'; // Timestamp importálása
import { Message } from '@/app/(tabs)/chats/[id]'
import {db} from '@/firebaseConfig'


const fetchMessages = async (chatId: string | string[]): Promise<Message[]> => {

  if (!chatId) {
    console.error("ChatID is required to fetch messages.")
    return []
  }

  try {
    const messagesCollection = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesCollection, orderBy("timestamp", "asc"))
    const snapshot = await getDocs(q);

    const messageList = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data()

        const timestamp = data.timestamp?.toDate().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }) ?? ''

        return {
          id: docSnap.id,
          message: data.message,
          isSent: data.isSent,
          timestamp: timestamp,
          red: data.red
        } as Message
      })
    )

    return messageList
  } catch (error) {
    console.error("Error fetching messages for chatID", chatId, ":", error)
    return []
  }
}

export default fetchMessages