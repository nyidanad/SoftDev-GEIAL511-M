import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

type Props = {}

const ChatSettings = (props: Props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainView}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={styles.profilePic}
        />
        <Text style={styles.profileText}>John Doe</Text>
        <Text style={styles.profileStatus}>Online</Text>
        <View style={styles.customView}>
          <Text style={styles.customText}>CUSTOMIZATION</Text>
          <View style={styles.colorView}>
            <Text style={styles.colorText}>Color Theme</Text>
            <View style={styles.colorsView}>
              <TouchableOpacity>
                <View style={styles.blue}></View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.turkiz}></View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.lightGreen}></View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.green}>
                  <View style={styles.white}></View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.yellow}></View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.orange}></View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.brown}></View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.red}></View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.pink}></View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.purple}></View>
              </TouchableOpacity>
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
    textAlign: "center",
    fontSize: 20,
  },
  profileStatus: {
    textAlign: "center",
    fontSize: 12,
    color: "#BBBBBE",
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
  colorText: {
    fontSize: 10,
    color: "#BBBBBB",
    margin: 8,
  },
  blue: {
    backgroundColor: "#A7CEF6",
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  turkiz: {
    backgroundColor: "#A7F6E3",
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  lightGreen: {
    backgroundColor: "#D8F6A7",
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  green: {
    backgroundColor: "#C1F6A7",
    borderRadius: 20,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  white: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    height: 15,
    width: 15,
  },
  yellow: {
    backgroundColor: "#F6F6A7",
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  orange: {
    backgroundColor: "#F6D8A7",
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  brown: {
    backgroundColor: "#E3C4A7",
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  red: {
    backgroundColor: "#F6A7A7",
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  pink: {
    backgroundColor: "#F6A7D8",
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  purple: {
    backgroundColor: "#D8A7F6",
    borderRadius: 20,
    height: 30,
    width: 30,
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