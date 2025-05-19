import { tokenCache } from './cache'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Feather from '@expo/vector-icons/Feather'

const publishableKey: string = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

const AppLayout = () => {
  return (
    <>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF', tabBarInactiveTintColor: '#B1B1B1' }}>
            <Tabs.Screen
              name="index"
              options={{
                headerShown: false,
                title: 'Chats',
                tabBarIcon: ({ color }) => <Ionicons size={28} name="chatbubbles-outline" color={color} />,
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                headerShown: false,
                title: 'Stories',
                tabBarIcon: ({ color }) => <Feather size={28} name="book-open" color={color} />,
              }}
            />
            <Tabs.Screen name='(auth)' options={{ 
              href: null,
              headerShown: false
              }} 
            />
            <Tabs.Screen name='(tabs)' options={{ 
              href: null,
              headerShown: false
              }} 
            />
            <Tabs.Screen name='updates' options={{ 
              href: null,
              headerShown: false
              }} 
            />
            <Tabs.Screen name='profile/[id]' options={{ 
              href: null,
              headerShown: false
              }} 
            />
          </Tabs>
        </ClerkLoaded>
      </ClerkProvider>
    </>
  )
}

export default AppLayout