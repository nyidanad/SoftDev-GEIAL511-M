import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import { getAuth } from '@firebase/auth'
import { db } from '@/firebaseConfig'
import { Chat } from '@/app/(tabs)/chats'

type ChatsCallback = (chats: Chat[]) => void

export const fetchChats = (callback: ChatsCallback) => {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) return () => {}

  const chatsCollection = collection(db, 'chats')
  const usersCollection = collection(db, 'users')
  const qc = query(chatsCollection, where('participants', 'array-contains', user.uid))

  const unsubscribe = onSnapshot(qc, async (snapshot) => {
    const chatList: Chat[] = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data()

        let lastUpdate = ''
        if (data.lastUpdate && typeof data.lastUpdate.toDate === 'function') {
          lastUpdate = data.lastUpdate.toDate().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        }

        const participants = data.participants as string[]
        const friendId = participants.find(uid => uid !== user.uid)

        let friendData
        if (friendId) {
          const friendDoc = await getDoc(doc(usersCollection, friendId))
          friendData = friendDoc.exists() ? friendDoc.data() : undefined
        }

        return {
          id: docSnap.id,
          name: friendData?.name ?? 'Unnamed',
          status: friendData?.status ?? 'offline',
          chatColor: data.chatColor ?? '#C1F6A7',
          lastMessage: data.lastMessage ?? '',
          lastUpdate,
          unread: data.unread ?? false,
          image: friendData?.image ?? require('@/assets/images/avatar.png'),
          isSent: data.isSent,
        } as Chat
      })
    )
    callback(chatList)
  })

  return unsubscribe
}
