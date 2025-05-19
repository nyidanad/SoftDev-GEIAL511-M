import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const addChatButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={require('@/assets/icons/chat.png')} style={styles.icon} />
    </TouchableOpacity>
  )
}

export default addChatButton

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11175A',
    position: 'absolute',
    borderRadius: 15,
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
  },
  icon: {
    width: 45,
    height: 45,
  },
})