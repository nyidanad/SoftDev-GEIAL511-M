import React, { useRef, useState } from 'react'
import { ColorValue, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ChatOptionsModal from './chatOptionsModal'

type chatBubleProps = {
  index: number
  name: string
  status: "online" | "offline" | "busy"
  lastMessage?: string
  lastUpdate?: string
  unread: boolean
  image: ImageSourcePropType
  uid: string
  isSent: string
  chatId: string
  onPress: () => void
}

const chatBubble = ({index, name, status, lastMessage, lastUpdate, unread, image, uid, isSent, chatId, onPress}: chatBubleProps) => {
  const [showModal, setShowModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0 })
  const chatsRef = useRef<(View | null)[]>([])


  // Calculating Modal position
  const calcModalPosition = (index: number) => {
    const ref = chatsRef.current[index]
    if (ref) {
      ref.measureInWindow((x, y, width, height) => {
        setModalPosition({ top: y + height - 60 })
      })
    }
  }

  let statusColor: ColorValue = '#000'
  switch(status) {
    case "online":
      statusColor = '#34C759'
      break
    case "busy":
      statusColor = '#FF3B30'
      break
  }

  return (
    <View ref={(ref) => (chatsRef.current[index] = ref)}>
      <TouchableOpacity style={styles.container} 
        onPress={onPress}
        onLongPress={() => [calcModalPosition(index), setShowModal(true)]}
      >
        <View style={styles.chatProfile}>
          <Image 
            source={image}
            style={styles.chatImg} 
          />
          {status !== 'offline' && <View style={[styles.chatStatus, { backgroundColor: statusColor }]} />}
        </View>

        <View style={styles.chatContent}>
          <View style={styles.chatWrapper}>
            <Text style={[styles.name, isSent != uid && { fontWeight: 'bold' }]}>{name}</Text>
            <View style={styles.chatStatusDetails}>
              <Text
                style={[styles.lastMsg, lastMessage !== '' && isSent !== uid && { color: '#363636', fontWeight: '500' }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {lastMessage === ''
                  ? "Now you're friends!"
                  : isSent === uid
                  ? 'You: ' + lastMessage
                  : lastMessage}
              </Text>
            </View>
          </View>
          <View style={styles.chatDetails}>
            {isSent !== uid && lastMessage !== '' && <View style={styles.undread} />}
            <Text style={styles.lastMsgTime}>{lastUpdate}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ChatOptionsModal chatId={chatId} showModal={showModal} setShowModal={setShowModal} modalPosition={modalPosition} />
    </View>
  )
}

export default chatBubble

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  chatProfile: {
    flexDirection: 'row'
  },
  chatImg: {
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 999,
    borderColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
  },
  chatStatus: {
    position: 'absolute',
    padding: 7,
    maxWidth: 10,
    maxHeight: 10,
    borderRadius: 999,
    borderColor: 'white',
    borderWidth: 2,
    left: 35,
    top: 35,
  },
  chatContent: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatWrapper: {
    width: '75%',
    justifyContent: 'center',
  },
  name: {
    color: '#363636',
    paddingBottom: 3,
  },
  chatStatusDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: '#11175A',
    fontSize: 16,
    marginRight: 5,
  },
  lastMsg: {
    color: '#AEAEB2',
    fontSize: 12,
    flexShrink: 1,
  },
  chatDetails: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  undread: {
    padding: 5,
    marginBottom: 8,
    borderRadius: 999,
    backgroundColor: '#FF3B30',
  },
  lastMsgTime: {
    color: '#AEAEB2',
    fontSize: 12,
  },
})