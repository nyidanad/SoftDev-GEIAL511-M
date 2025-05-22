import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'

export default function App() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return null

  return <Redirect href={isSignedIn ? '/chats' : '/login'} />
}
