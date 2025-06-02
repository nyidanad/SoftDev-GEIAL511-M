import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const colors = ['#A7CFF6', '#A7F6E3', '#D8F6A7', '#C1F6A7',
                '#F6F6A7', '#F6D8A7', '#E3C4A7', '#F6A7A7',
                '#F6A7D8', '#D8A7F6']

const ChatSettings = () => {
  const { id, name, status, image } = useLocalSearchParams()
  const [color, setColor] = useState('')
  const [selectedColor, setSelectedColor] = useState(color)

  // Fetch chatColor from database
  useEffect(() => {
    const getChatColor = async () => {
      const docRef = doc(db, 'chats', `${id}`)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setColor(docSnap.data().chatColor)
        setSelectedColor(docSnap.data().chatColor)
      }
    }
    getChatColor()
  }, [])
    

  // Update chatColor in database
  useEffect(() => {
  const updateColor = async () => {
    if (selectedColor) {
      const docRef = doc(db, 'chats', `${id}`)
      await updateDoc(docRef, {
        chatColor: selectedColor
      })
    }
  }
  updateColor()
}, [selectedColor])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainView}>
        <Image 
          source={image as any}
          style={styles.profilePic}
        />
        <Text style={styles.profileText}>{name}</Text>
        <Text style={styles.profileStatus}>{status}</Text>
        <View style={styles.customView}>
          <Text style={styles.customText}>CUSTOMIZATION</Text>
          <View style={styles.colorView}>
            <Text style={styles.colorText}>Color Theme</Text>
            <View style={styles.colorsView}>
              {colors.map((c) => (
                <TouchableOpacity key={c} onPress={() => setSelectedColor(c)}>
                  <View style={[styles.colorCircle, { backgroundColor: c }]}>
                    {selectedColor === c && <View style={styles.innerDot} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.colorText}>Alias</Text>
            <View style={styles.viewInputAlias}>
              <Ionicons name="at" style={styles.inputAliasIcon} />
              <TextInput
                style={styles.inputAliasText}
                placeholder="Type alias here..."
                placeholderTextColor={"#BBBBBB"}
              />
            </View>
          </View>
        </View>
        <View style={styles.additionalView}>
          <Text style={styles.customText}>ADDITIONAL FEATURES</Text>
          <View style={styles.notificationView}>
            <View style={styles.notificationIcon}></View>
            <View style={styles.notificationText}>
              <Image
                source={require("@/assets/icons/bell-outline.png")}
                style={styles.bellIcon}
              />
              <TouchableOpacity>
                <Text style={styles.notificationTextLabel1}>Notification</Text>
                <Text style={styles.notificationTextLabel2}>
                  Manage chat notification settings
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchView}>
            <View style={styles.searchIcon}></View>
            <View style={styles.searchText}>
              <Image
                source={require("@/assets/icons/magnifer-outline.png")}
                style={styles.bellIcon}
              />
              <TouchableOpacity>
                <Text style={styles.notificationTextLabel1}>
                  Search message
                </Text>
                <Text style={styles.notificationTextLabel2}>
                  Find specific messages within the chat
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imagesView}>
            <View style={styles.imagesIcon}></View>
            <View style={styles.imagesText}>
              <Image
                source={require("@/assets/icons/gallery-outline.png")}
                style={styles.bellIcon}
              />
              <TouchableOpacity>
                <Text style={styles.notificationTextLabel1}>Gallery</Text>
                <Text style={styles.notificationTextLabel2}>
                  Browse shared images in the chat
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filesView}>
            <View style={styles.filesIcon}></View>
            <View style={styles.filesText}>
              <Image
                source={require("@/assets/icons/document-outline.png")}
                style={styles.bellIcon}
              />
              <TouchableOpacity>
                <Text style={styles.notificationTextLabel1}>Files</Text>
                <Text style={styles.notificationTextLabel2}>
                  Browse shared files in the chat
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.securityView}>
          <Text style={styles.customText}>SECURITY & PRIVACY</Text>
          <View style={styles.notificationView}>
            <View style={styles.notificationIcon}></View>
            <View style={styles.notificationText}>
              <Ionicons name="warning-outline" size={26} color="#FFCC00" />
              <TouchableOpacity>
                <Text style={styles.notificationTextLabel1}>Report</Text>
                <Text style={styles.notificationTextLabel2}>
                  Alert the admin about this contact for review
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.blockView}>
            <View style={styles.notificationIcon}></View>
            <View style={styles.notificationText}>
              <Ionicons
                name="remove-circle-outline"
                size={26}
                color="#FF2D55"
              />
              <TouchableOpacity>
                <Text style={styles.notificationTextLabel1}>Block</Text>
                <Text style={styles.notificationTextLabel2}>
                  Prevent this contact from sending you messages
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.deleteView}>
            <View style={styles.notificationIcon}></View>
            <View style={styles.notificationText}>
              <Ionicons name="trash" size={26} color="#FB3D3D" />
              <TouchableOpacity>
                <Text style={styles.notificationTextLabel1}>Delete</Text>
                <Text style={styles.notificationTextLabel2}>
                  Remove this contact from your list permanently
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChatSettings;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#FAFAFA",
    paddingVertical: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: "center",
    margin: 10,
    borderColor: "rgba(0, 0, 0, 0.08)",
    borderWidth: 1,
  },
  profileText: {
    color: '#363636',
    fontSize: 20,
    textAlign: "center",
    fontWeight: 'bold',
  },
  profileStatus: {
    textAlign: "center",
    fontSize: 12,
    color: "#BBBBBE",
    textTransform: 'capitalize'
  },
  customView: {
    margin: 10,
  },
  additionalView: {
    marginHorizontal: 10,
  },
  customText: {
    fontSize: 12,
    color: "#D1D1D6",
    margin: 6,
  },
  colorView: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 16,
  },
  colorsView: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  colorCircle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  innerDot: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    width: 14,
    height: 14,
  },
  colorText: {
    fontSize: 10,
    color: "#BBBBBB",
    margin: 8,
  },
  viewInputAlias: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#F2F2F7",
    marginHorizontal: 8,
  },
  inputAliasText: {
    flex: 1,
    borderRadius: 8,
    fontSize: 12,
    width: "100%",
    color: "#BBBBBB",
  },
  inputAliasIcon: {
    fontSize: 22,
    marginHorizontal: 8,
    color: "#BBBBBB",
  },
  notificationView: {
    backgroundColor: "white",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  notificationIcon: {
    backgroundColor: "white",
  },
  notificationText: {
    flexDirection: "row",
    margin: 16,
  },
  searchView: {
    marginTop: 2,
    backgroundColor: "white",
  },
  searchIcon: {
    backgroundColor: "white",
  },
  searchText: {
    flexDirection: "row",
    margin: 16,
  },
  imagesView: {
    marginTop: 2,
    backgroundColor: "white",
  },
  imagesIcon: {
    backgroundColor: "white",
  },
  imagesText: {
    flexDirection: "row",
    margin: 16,
  },
  filesView: {
    marginTop: 2,
    backgroundColor: "white",
    borderEndEndRadius: 20,
    borderStartEndRadius: 20,
  },
  filesIcon: {
    backgroundColor: "white",
  },
  filesText: {
    flexDirection: "row",
    margin: 16,
  },
  notificationTextLabel1: {
    backgroundColor: "white",
    marginHorizontal: 12,
  },
  notificationTextLabel2: {
    fontSize: 10,
    color: "#ABABAC",
    marginHorizontal: 12,
  },
  bellIcon: {
    height: 26,
    width: 26,
  },
  securityView: {
    margin: 10,
  },
  blockView: {
    marginTop: 2,
    backgroundColor: "white",
  },
  deleteView: {
    marginTop: 2,
    backgroundColor: "white",
    borderEndEndRadius: 20,
    borderStartEndRadius: 20,
  },
});