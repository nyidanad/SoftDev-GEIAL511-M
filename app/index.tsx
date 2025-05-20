import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import ChatBubble from '@/components/chatBubble'
import AddChatButton from '@/components/addChatButton'
import StoryBubble from '@/components/storyBubble'
import AddStoryButton from '@/components/addStoryButton'

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

  const storiesData = [
    {id: '1', name: 'John', image: require('@/assets/images/avatar.png')},
    {id: '2', name: 'Adam', image: require('@/assets/images/avatar.png')},
    {id: '3', name: 'Henry', image: require('@/assets/images/avatar.png')},
    {id: '4', name: 'Kate', image: require('@/assets/images/avatar.png')},
    {id: '5', name: 'Mike', image: require('@/assets/images/avatar.png')},
    {id: '6', name: 'Mike', image: require('@/assets/images/avatar.png')},
    {id: '7', name: 'Mike', image: require('@/assets/images/avatar.png')}
  ]

  const chatsData = [
    {id: '1', name: 'John Williams', status: 'online' as const,  lastMsg: 'You: Soon.. very soon.', lastMsgStatus: 'red' as const, lastMsgTime: '11:20', unread: false, image: require('@/assets/images/avatar.png')},
    {id: '2', name: 'Adam Miller', status: 'dnd' as const, lastMsg: 'You sent a photo.', lastMsgStatus: 'red' as const, lastMsgTime: '11:07', unread: false, image: require('@/assets/images/avatar.png')},
    {id: '3', name: 'Anna Smith', status: 'offline' as const, lastMsg: 'It is a long established fact 😘', lastMsgStatus: 'recieved' as const, lastMsgTime: '10:23', unread: true, image: require('@/assets/images/avatar.png')},
    {id: '4', name: 'Henry Garcia', status: 'online' as const, lastMsg: 'Lets hit it tomorrow!', lastMsgStatus: 'recieved' as const, lastMsgTime: '07:48', unread: true, image: require('@/assets/images/avatar.png')},
    {id: '5', name: 'Harrison Ford', status: 'offline' as const, lastMsg: 'You: Oi, just found your hat! 🤠', lastMsgStatus: 'sent' as const, lastMsgTime: 'feb. 22.', unread: false, image: require('@/assets/images/avatar.png')},
    {id: '6', name: 'Kate Johnson', status: 'online' as const, lastMsg: 'Thank you, so much!', lastMsgStatus: 'red' as const, lastMsgTime: 'feb. 20.', unread: false, image: require('@/assets/images/avatar.png')},
    {id: '7', name: 'Mike Tyson', status: 'offline' as const, lastMsg: 'There are many variants of Calculus of variants!', lastMsgStatus: 'red' as const, lastMsgTime: 'feb. 18.', unread: false, image: require('@/assets/images/avatar.png')},
    {id: '8', name: 'Laura Oostenbrugge', status: 'offline' as const, lastMsg: 'You: Happy Birthday! 🎂🎊🎈', lastMsgStatus: 'sent' as const, lastMsgTime: 'feb. 18.', unread: false, image: require('@/assets/images/avatar.png')},
    {id: '9', name: 'Sophie Turner', status: 'online' as const, lastMsg: 'Let’s go hiking this weekend.', lastMsgStatus: 'recieved' as const, lastMsgTime: 'feb. 16.', unread: true, image: require('@/assets/images/avatar.png')},
    {id: '10', name: 'Elon Musk', status: 'dnd' as const, lastMsg: 'Launching the new prototype today!', lastMsgStatus: 'red' as const, lastMsgTime: '2077.06.12.', unread: false, image: require('@/assets/images/avatar.png')}
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name='bars' style={styles.headerIcons} />
        <Text style={{ fontFamily: 'CheGueveraBarry', fontSize: 26, color: '#11175A' }}>Bubly</Text>
        <FontAwesome name='search' style={styles.headerIcons} />
      </View>

      <View style={styles.stories}>
        <AddStoryButton />
        <FlatList
          data={storiesData}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <StoryBubble name={item.name} image={item.image} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.chats}>
        <Text style={styles.chatsTitle}>Chats</Text>
        <FlatList
          data={chatsData}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => 
            <ChatBubble 
              name={item.name}
              status={item.status}
              lastMsg={item.lastMsg}
              lastMsgStatus={item.lastMsgStatus}
              lastMsgTime={item.lastMsgTime}
              unread={item.unread}
              image={item.image}
            />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
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
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
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