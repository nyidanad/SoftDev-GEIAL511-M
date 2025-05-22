import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

type Props = {}

const ChatsLayout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false,
      }} />
    </Stack>
  )
}

export default ChatsLayout