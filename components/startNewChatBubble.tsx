import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { getAuth } from '@firebase/auth'

type ChatBubbleProps = {
  index: number
  uid: string | undefined
  name: string
  email: string
  image: ImageSourcePropType
}

const StartNewChatBubble = ({ index, uid, name, email, image }: ChatBubbleProps) => {
  const auth = getAuth()
  const user = auth.currentUser
  const chatsRef = useRef<(View | null)[]>([])

  const addChat = async () => {
    if (!user || !uid) return
    try {
      await addDoc(collection(db, 'chats'), {
        chatColor: '#D8F6A7',
        isSent: '',
        lastMessage: '',
        lastUpdate: '',
        participants: [user.uid, uid],
        unread: true,
      })
    } catch (error) {
      console.error("Error adding chat: ", error)
    }
  }

  return (
    <View ref={(ref) => (chatsRef.current[index] = ref)}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require('@/assets/images/avatar.png')} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={addChat}>
          <Ionicons name='person-add-outline' style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StartNewChatBubble


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  details: {
    marginLeft: 15,
  },
  name: {
    color: '#363636',
    marginBottom: 2,
  },
  email: {
    color: '#AEAEB2',
    fontSize: 12,
  },
  icon: {
    color: '#11175A',
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: '#11175A',
    borderWidth: 1,
    borderRadius: 999, 
  },
})