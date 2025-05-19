import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

import ChatBubble from '@/components/chatBubble'
import AddChatButton from '@/components/addChatButton'

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded, error] = useFonts({
    CheGueveraBarry: require('../assets/fonts/CheGuevaraBarry-Brown.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name='bars' style={styles.headerIcons} />
        <Text style={{ fontFamily: 'CheGueveraBarry', fontSize: 26, color: '#11175A' }}>Bubly</Text>
        <FontAwesome name='search' style={styles.headerIcons} />
      </View>

      <View style={styles.stories}>

      </View>

      <View style={styles.chats}>
        <Text style={styles.chatsTitle}>Chats</Text>

        <ChatBubble 
          name='John Williams'
          status='online'
          lastMsg='You: Soon.. very soon.'
          lastMsgStatus='red'
          lastMsgTime='11:20'
          unread={false}
          image=''
        />

        <ChatBubble
          name='Adam Miller'
          status='idle'
          lastMsg='You sent a photo.'
          lastMsgStatus='red'
          lastMsgTime='11:07'
          unread={false}
          image=''
        />

        <ChatBubble
          name='Anna Smith'
          status='online'
          lastMsg='It is a long established fact 😘'
          lastMsgStatus='recieved'
          lastMsgTime='10:23'
          unread={true}
          image=''
        />

        <ChatBubble
          name='Henry Garcia'
          status='offline'
          lastMsg='Lets hit it tomorrow!'
          lastMsgStatus='recieved'
          lastMsgTime='07:48'
          unread={true}
          image=''
        />

        <ChatBubble
          name='Harrison Ford'
          status='dnd'
          lastMsg='You: Oi, just found your hat! 🤠'
          lastMsgStatus='sent'
          lastMsgTime='feb. 22.'
          unread={false}
          image=''
        />
      </View>
      <AddChatButton />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  headerIcons: {
    padding: 10,
    borderRadius: 999,
    backgroundColor: '#EBEBEB',
    fontSize: 18,
    color: '#11175A'
  },
  stories: {
    minHeight: 50,
  },
  chats: {
    paddingHorizontal: 20,
    flex: 1,
  },
  chatsTitle: {
    paddingBottom: 20,
    color: '#363636',
    fontSize: 24,
    fontWeight: 'bold',
  },
})