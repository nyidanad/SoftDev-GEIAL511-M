import React, { Dispatch, SetStateAction } from 'react'
import { Image, ImageSourcePropType, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { useRouter } from 'expo-router'

import { getAuth } from '@firebase/auth'
import { auth } from '@/firebaseConfig'

type ModalProps = {
  name: string
  email: string
  image: ImageSourcePropType
  status: 'online' | 'offline' | 'busy'
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const sidebarModal = ({ name, email, image, status, showModal, setShowModal }: ModalProps) => {
  const router = useRouter()

  const [loaded, error] = useFonts({
    CheGueveraBarry: require('@/assets/fonts/CheGuevaraBarry-Brown.ttf'),
  })

  if (!loaded && !error) {
    return null;
  }

  // Auth changes listener
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace('/login')
  })

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType='slide'
      onRequestClose={() => setShowModal(false)}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <View style={styles.container}>
          <View style={[styles.headerWrapper, { justifyContent: 'space-between' }]}>
            <View style={styles.header}>
              <Image source={require('@/assets/logos/bubly-logo-notitle.png')} style={styles.logo} />
              <Text style={styles.title}>Bubly</Text>
            </View>
            <TouchableOpacity onPress={() => setShowModal(false)} >
              <Feather name='sidebar' style={styles.headerIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.tabs}>
            {/* Chats */}
            <TouchableOpacity style={[styles.tabWrapper, { backgroundColor: 'rgba(242,242,247,0.4)' }]}>
              <Image source={require('@/assets/icons/sidebar-chats.png')} style={{ width: 25, height: 25 }} />
              <Text style={styles.text}>Chats</Text>
            </TouchableOpacity>

            {/* Managing */}
            <TouchableOpacity style={styles.tabWrapper}>
              <MaterialCommunityIcons name='card-account-details-outline' style={[styles.icon, { color: '#9A8899' }]} />
              <Text style={styles.text}>Managing</Text>
            </TouchableOpacity>

            {/* Updates & FAQ */}
            <TouchableOpacity style={styles.tabWrapper}>
              <Ionicons name='barcode-outline' style={[styles.icon, { color: '#FF9500' }]} />
              <Text style={styles.text}>Updates & FAQ</Text>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity style={styles.tabWrapper}>
              <Feather name='settings' style={[styles.icon, { color: '#9471CA' }]} />
              <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>

            {/* Archive */}
            <TouchableOpacity style={styles.tabWrapper}>
              <Ionicons name='albums' style={[styles.icon, { color: '#4F5358' }]} />
              <Text style={styles.text}>Archive</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.profile}>
              <Image source={require('@/assets/images/avatar.png')} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
              </View>
            </View>
            <View style={styles.options}>
              <TouchableOpacity  style={styles.statusOption}>
                <View style={styles.detailsWrapper}>
                  <View style={styles.details}>
                    <View style={styles.statusIcon} />
                    <Text style={styles.optionsText}>Online</Text>
                  </View>
                  <Ionicons name='chevron-forward' style={styles.statusChevron} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity  style={styles.logoutOption} onPress={() => auth.signOut()}>
                <Ionicons name='log-out-outline' style={styles.logoutIcon} />
                <Text style={styles.optionsText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default sidebarModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    marginRight: '25%',
    borderRadius: 25,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontFamily: 'CheGueveraBarry',
    color: '#11175A',
    fontSize: 28, 
    marginLeft: 10,
  },
  headerIcon: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    color: '#11175A',
    fontSize: 24,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },

  tabs: {
    flex: 1,
  },
  tabWrapper: {
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  icon: {
    fontSize: 24,
  },
  text: {
    color: '#363636',
    fontSize: 16,
    marginLeft: 15,
  },
  detailsContainer: {
    backgroundColor: 'rgba(120,120,128,0.08)',
    borderRadius: 15,
    padding: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 999,
    marginRight: 10,
  },
  name: {
    color: '#363636',
    fontWeight: 'bold',
  },
  email: {
    color: '#C7C7CC',
    fontSize: 10
  },

  options: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
  },
  statusOption: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  detailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    backgroundColor: '#34C759',
    width: 15,
    height: 15,
    borderRadius: 999,
    marginRight: 5,
  },
  optionsText: {
    color: '#363636',
    marginLeft: 10,
  },
  statusChevron: {
    color: 'rgba(60,60,67,0.3)'
  },
  logoutOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  logoutIcon: {
    color: '#6B7071',
    fontSize: 20,
  },
})