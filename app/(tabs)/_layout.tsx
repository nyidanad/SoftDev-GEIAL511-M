import React from 'react'
import { Tabs, useSegments } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Feather from '@expo/vector-icons/Feather'

const TabsLayout = () => {
  const segments = useSegments();
  const hideTabBar = [...segments].includes("[id]");

  return (
    <Tabs 
      screenOptions={{ tabBarActiveTintColor: '#007AFF', tabBarInactiveTintColor: '#B1B1B1' }}
      tabBar={hideTabBar ? () => null : undefined}
    >
      <Tabs.Screen
        name="chats"
        options={{
          headerShown: false,
          title: 'Chats',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="chatbubbles-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          headerShown: false,
          title: 'Stories',
          tabBarIcon: ({ color }) => <Feather size={28} name="book-open" color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout