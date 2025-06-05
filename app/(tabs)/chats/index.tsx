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
import SearchBar from '@/components/searchbar'

import { fetchChats } from '@/hooks/fetchChats'
import { User } from '@/hooks/usePeople'

import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { getAuth } from '@firebase/auth'

export type Chat = {
  id: string
  name: string
  status: "online" | "offline" | "busy"
  lastMessage: string
  lastUpdate: string
  unread: boolean
  image: ImageSourcePropType
  isSent: string
}


const Chats = () => {
  const auth = getAuth()
  const user = auth.currentUser
  const [userData, setUserData] = useState<User>()

  const router = useRouter()
  const [showSidebar, setShowSidebar] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  const [loaded, error] = useFonts({
    CheGueveraBarry: require('@/assets/fonts/CheGuevaraBarry-Brown.ttf'),
  })

  
  // Fetching current user's chats
  useEffect(() => {
    const unsubscribe = fetchChats((chatData) => {
      setChats(chatData)
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])


  // Get current user datas
  useEffect(() => {
    const loadData = async () => {
      const usersCollection = collection(db, 'users')
      
      if (user?.uid) {
        const userDoc = await getDoc(doc(usersCollection, user.uid))
        const data = userDoc.exists() ? userDoc.data() : undefined
        setUserData(data as User)
      }
    }
    loadData()
  }, [])


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

          {searchVisible ? (
            <SearchBar
              searchVisible={searchVisible}
              setSearchVisible={setSearchVisible}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          ) : (
            <>
              <Text style={{ fontFamily: 'CheGueveraBarry', fontSize: 26, color: '#11175A' }}>Bubly</Text>
              <TouchableOpacity onPress={() => setSearchVisible(prev => !prev)}>
                <FontAwesome name='search' style={styles.headerIcons} />
              </TouchableOpacity>
            </>
          )}
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
            data={chats.filter(chat =>
              chat.name.toLowerCase().includes(searchText.toLowerCase())
            )}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => 
              <ChatBubble 
                index={index}
                name={item.name}
                status={item.status}
                lastMessage={item.lastMessage}
                lastUpdate={item.lastUpdate}
                unread={item.unread}
                image={item.image}
                uid={user!.uid}
                isSent={item.isSent}
                chatId={item.id}
                onPress={() => router.push({
                  pathname: '/chats/[id]',
                  params: {
                    id: item.id,
                    name: item.name,
                    status: item.status,
                    image: item.image as any,
                  }
                })}
              />}
              
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </View>
        <AddChatButton />

        {userData && (
          <SidebarModal
            name={userData.name}
            email={userData.email}
            image={userData.image}
            status={userData.status}
            showModal={showSidebar}
            setShowModal={setShowSidebar}
          />
        )}
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