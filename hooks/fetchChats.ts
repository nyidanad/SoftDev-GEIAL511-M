import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { getAuth } from '@firebase/auth'
import { db } from '@/firebaseConfig'

import { Chat } from '@/app/(tabs)/chats'

const fetchDatas = async (): Promise<Chat[] | undefined> => {
  const auth = getAuth()
  const user = auth.currentUser
  const chatsCollection = collection(db, 'chats')
  const usersCollection = collection(db, 'users')

  if (!user) return

  try {
    const qc = query(chatsCollection, where('participants', 'array-contains', user.uid))
    const snapshot = await getDocs(qc)

    const chatList = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data()

        const lastUpdate = data.lastUpdate?.toDate().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }) ?? ''

        const participants = data.participants as string[];
        const friendId = participants.find(uid => uid !== user.uid);

        let friendData
        if (friendId) {
          const friendDoc = await getDoc(doc(usersCollection, friendId))
          friendData = friendDoc.exists() ? friendDoc.data() : undefined
        }

        return {
          id: docSnap.id,
          name: friendData?.name ?? 'Unnamed',
          status: friendData?.status ?? 'offline',
          lastMessage: data.lastMessage ?? '',
          lastStatus: data.lastStatus ?? 'received',
          lastUpdate: lastUpdate || new Date().toISOString(),
          unread: data.unread ?? false,
          image: friendData?.image ?? require('@/assets/images/avatar.png'),
        } as Chat
      })
    )

    return chatList
  } catch (error) {
    console.error('Error fetching chats:', error)
  }
}

export default fetchDatas
