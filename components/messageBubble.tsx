import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

type MessageBubbleProps = {
  message: string
  isSent: boolean
  timestamp: string
  red?: boolean
}

const messageBubble = ({message, isSent, timestamp, red}: MessageBubbleProps) => {
  const {image} = useLocalSearchParams()

  return (
    <View style={[styles.container, isSent ? styles.senderContainer : styles.recieverContainer]}>
      {!isSent && 
        <View style={styles.imageWrapper}>
          <Image source={image as ImageSourcePropType} style={styles.image} />
        </View>
      }

      <View style={[styles.msgWrapper, isSent ? styles.senderMsgWrapper : styles.recieverMsgWrapper]}>
        <Text style={styles.msg}>{message}</Text>
        <View style={styles.details}>
          <Text style={styles.time}>{timestamp}</Text>
          {isSent &&
            <Ionicons 
              name={red ? 'checkmark-done' : 'checkmark-circle-outline'}
              style={styles.icon} 
            />
          }
        </View>
      </View>
    </View>
  )
}

export default messageBubble

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  senderContainer: {
    justifyContent: 'flex-end',
    marginLeft: '20%',
  },
  recieverContainer: {
    justifyContent: 'flex-start',
    marginRight: '20%',
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 999,
  },
  msgWrapper: {
    maxWidth: '80%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  senderMsgWrapper: {
    backgroundColor: '#C1F6A7',
    alignSelf: 'flex-end',
  },
  recieverMsgWrapper: {
    backgroundColor: '#EDEDED',
    alignSelf: 'flex-start',
  },
  msg: {
    color: '#363636',
    fontSize: 14,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  time: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: 12,
    marginRight: 5,
  },
  icon: {
    color: 'rgba(0,0,0,0.65)',
    fontSize: 16,
  },
});
