import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const addStoryButton = () => {
  return (
    <TouchableOpacity style={styles.cointainer}>
      <View style={styles.iconWrapper}>
        <Ionicons name='add' style={styles.icon} />
      </View>
      <Text style={styles.title}>Add story</Text>
    </TouchableOpacity>
  )
}

export default addStoryButton

const styles = StyleSheet.create({
  cointainer: {
    alignItems: 'center'
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 999,
    borderColor: 'rgba(60, 60, 67, 0.29)',
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: 5,
  },
  icon: {
    color: 'rgba(27, 31, 38, 0.72)',
    fontSize: 18
  },
  title: {
    color: '#363636',
    fontSize: 10,
    textAlign: 'center',
  }
})