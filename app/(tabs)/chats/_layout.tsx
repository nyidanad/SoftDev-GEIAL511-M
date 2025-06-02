import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ColorValue } from 'react-native'
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function AppLayout() {
  const router = useRouter()
  const { id, name, status, image } = useGlobalSearchParams()

  let statusColor: ColorValue = '#000'
    switch(status) {
      case "online":
        statusColor = '#30B852'
        break
      case "offline":
        statusColor = '#BBBBBE'
        break
      case "busy":
        statusColor = '#F0372D'
        break
    }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerShadowVisible: true,
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" style={styles.backIcon} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.middleContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity 
              onPress={() =>
                router.push({
                  pathname: '/chats/chat-settings/[id]',
                  // @ts-ignore
                  params: { id, name, status, image },
                })
              }
            >
              <Ionicons name="options-outline" style={styles.settingIcon} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen 
        name='chat-settings'
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.settingsContainer}>
              <Ionicons name="chevron-back" style={styles.settingsBackIcon} />
              <Text style={styles.settingsTitle}>Chat</Text>
            </TouchableOpacity>
          ),
          headerTitle: () => null,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    color: "#11175A",
    fontSize: 28,
  },
  middleContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#363636',
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    color: '#BBBBBE',
    textTransform: 'capitalize',
    fontSize: 12,
  },
  settingIcon: {
    color: "#11175A",
    fontSize: 24,
    backgroundColor: 'rgba(0,0,0,0.08)',
    padding: 5,
    borderRadius: 999,
  },
  settingsContainer: {
    flexDirection: 'row',
  },
  settingsBackIcon: {
    fontSize: 24,
    color: "#11175A",
  },
  settingsTitle: {
    fontSize: 18,
    color: "#11175A",
    marginLeft: 5,
  },
});
