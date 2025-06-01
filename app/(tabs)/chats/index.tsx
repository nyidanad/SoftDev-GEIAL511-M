import React, { useEffect, useState } from 'react'
import { FlatList, ImageSourcePropType, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { useRouter } from 'expo-router'

import ChatBubble from '@/components/chatBubble'
import AddChatButton from '@/components/addChatButton'
import StoryBubble from '@/components/storyBubble'
import AddStoryButton from '@/components/addStoryButton'
import SidebarModal from '@/components/sidebarModal'

import fetchChats from '@/hooks/fetchChats'

export type Chat = {
  id: string
  name: string
  status: "online" | "offline" | "dnd"
  lastMessage: string
  lastStatus: "sent" | "recieved" | "red"
  lastUpdate: string
  unread: boolean
  image: ImageSourcePropType
}

const Chats = () => {
  const router = useRouter()
  const [showSidebar, setShowSidebar] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])

  const [loaded, error] = useFonts({
    CheGueveraBarry: require('@/assets/fonts/CheGuevaraBarry-Brown.ttf'),
  })

  
  // Fetching current user's chats
  useEffect(() => {
    const loadChats = async () => {
      const chatData = await fetchChats();
      // @ts-ignore
      setChats(chatData);
    };
    loadChats();
  }, []);


  const storiesData = [
    {id: '1', name: 'John', image: require('@/assets/avatars/male-1.jpg')},
    {id: '2', name: 'Adam', image: require('@/assets/avatars/male-2.jpg')},
    {id: '3', name: 'Henry', image: require('@/assets/avatars/male-3.jpg')},
    {id: '4', name: 'Kate', image: require('@/assets/avatars/female-2.jpg')},
    {id: '5', name: 'Mike', image: require('@/assets/avatars/male-4.jpg')},
    {id: '6', name: 'Sophie', image: require('@/assets/avatars/female-4.jpg')},
  ]

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowSidebar(true)} >
            <FontAwesome name='bars' style={styles.headerIcons} />
          </TouchableOpacity>
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
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => 
              <ChatBubble 
                index={index}
                name={item.name}
                status={item.status}
                lastMessage={item.lastMessage}
                lastStatus={item.lastStatus}
                lastUpdate={item.lastUpdate}
                unread={item.unread}
                image={item.image}
                onPress={() => router.push({
                  pathname: '/chats/[id]',
                  params: {
                    id: item.id,
                    name: item.name,
                    status: item.status,
                    image: item.image as any
                  }
                })}
              />}
              
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </View>
        <AddChatButton />
        <SidebarModal showModal={showSidebar} setShowModal={setShowSidebar} />
      </View>
    </>
  )
}

export default Chats

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