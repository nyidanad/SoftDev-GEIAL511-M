import { Stack } from 'expo-router'

const ChatSettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='[id]' options={{ headerShown: false }} />
    </Stack>
  )
}

export default ChatSettingsLayout