import { ColorValue, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

type chatBubleProps = {
  name: string
  status: "online" | "offline" | "dnd"
  lastMsg?: string
  lastMsgStatus?: "sent" | "recieved" | "red"
  lastMsgTime?: string
  unread: boolean
  image: ImageSourcePropType
  onPress: () => void
}

const chatBubble = ({name, status, lastMsg, lastMsgStatus, lastMsgTime, unread, image, onPress}: chatBubleProps) => {
  let icon: keyof typeof Ionicons.glyphMap = 'warning'
  switch(lastMsgStatus) {
    case "sent":
      icon = 'checkmark-circle-outline'
      break
    case "red":
      icon = 'checkmark-done'
      break
  }

  let statusColor: ColorValue = '#000'
  switch(status) {
    case "online":
      statusColor = '#34C759'
      break
    case "dnd":
      statusColor = '#FF3B30'
      break
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.chatProfile}>
        <Image 
          source={image}
          style={styles.chatImg} 
        />
        {status !== 'offline' && <View style={[styles.chatStatus, { backgroundColor: statusColor }]} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatWrapper}>
          <Text style={[styles.name, unread == true && { fontWeight: 'bold' }]}>{name}</Text>
          <View style={styles.chatStatusDetails}>
            {unread == false && <Ionicons name={icon} style={styles.icon} />}
            <Text 
              style={[styles.lastMsg, unread == true && { color: '#363636', fontWeight: '500' }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {lastMsg}
            </Text>
          </View>
        </View>
        <View style={styles.chatDetails}>
          {unread == true ? <View style={styles.undread} /> : null }
          <Text style={styles.lastMsgTime}>{lastMsgTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
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