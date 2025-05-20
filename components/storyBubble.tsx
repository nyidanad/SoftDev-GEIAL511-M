import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type storyBubbleProps = {
  name: string
  image: ImageSourcePropType
}

const storyBubble = ({name, image}: storyBubbleProps) => {
  return (
    <TouchableOpacity style={styles.cointainer}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

export default storyBubble

const styles = StyleSheet.create({
  cointainer: {
    alignItems: 'center',
    paddingLeft: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 999,
    borderColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
    marginBottom: 5,
  },
  name: {
    color: '#363636',
    fontSize: 10,
    textAlign: 'center',
  }
})