import { useEffect } from "react"
import { getAuth } from "@firebase/auth"
import { db } from "@/firebaseConfig"
import { collection, onSnapshot, orderBy, query, where, DocumentData } from "firebase/firestore"
import { ImageSourcePropType } from "react-native"

export type User = {
  uid?: string
  name: string
  email: string
  image: ImageSourcePropType
  status: "online" | "offline" | "busy"
}

const usePeople = (setUsers: (users: User[]) => void) => {
  
  useEffect(() => {
    const auth = getAuth()
    const user = auth.currentUser
    
    if (!user) return

    const chatsQuery = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid)
    )

    const unsubscribeChats = onSnapshot(chatsQuery, (chatSnapshot) => {
      const existingUserIds = new Set<string>()

      chatSnapshot.forEach((doc) => {
        const participants: string[] = doc.data().participants || []
        const otherUserId = participants.find((id) => id !== user.uid)
        if (otherUserId) existingUserIds.add(otherUserId)
      })

      const usersQuery = query(collection(db, "users"), orderBy("name"))
      const unsubscribeUsers = onSnapshot(usersQuery, (userSnapshot) => {
        const users: User[] = userSnapshot.docs
          .filter((doc) => {
            const uid = doc.id
            return uid !== user.uid && !existingUserIds.has(uid)
          })
          .map((doc) => {
            const data = doc.data() as DocumentData
            return {
              uid: doc.id,
              name: data.name,
              email: data.email,
              image: data.avatar,
              status: data.status,
            }
          })

        setUsers(users)
      })

      return unsubscribeUsers
    })

    return () => {
      unsubscribeChats()
    }
  }, [setUsers])
}

export default usePeople
