import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const changePassword = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainView}>
          <StatusBar backgroundColor={"#11175A"} />
          <View style={styles.bublyView}>
            <Image
              source={require("@/assets/logos/bubly-logo-alpha.png")}
              style={styles.bublyIcon}
            />
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.changePsw}>Change Password</Text>

            <View style={styles.viewInput}>
              <Ionicons name="key-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor={"#BBBBBB"}
              />
              <Feather name="eye-off" style={styles.inputIcons} />
            </View>

            <View style={styles.viewInput}>
              <Ionicons name="key-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={"#BBBBBB"}
              />
              <Feather name="eye-off" style={styles.inputIcons} />
            </View>

            <TouchableOpacity style={styles.touchBtn}>
              <Text style={styles.confirmBtn}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default changePassword;

const styles = StyleSheet.create({
  viewStyle: {
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 300,
    paddingBottom: 30,
    marginBottom: 10,
  },
  changePsw: {
    textAlign: "center",
    fontSize: 34,
    margin: 24,
    color: "#11175A",
    fontWeight: 'bold',
  },
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#F2F2F7",
  },
  inputIcons: {
    fontSize: 22,
    marginHorizontal: 10,
    color: "#BBBBBB",
  },
  input: {
    flex: 1,
    borderRadius: 8,
    width: "100%",
    color: "#363636",
  },
  confirmBtn: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    textAlignVertical: "center",
    fontWeight: 'bold',
  },
  touchBtn: {
    marginTop: 16,
    backgroundColor: "#11175A",
    justifyContent: "center",
    borderRadius: 8,
    width: "100%",
    height: 50,
  },
  forgotPwd: {
    textAlign: "center",
    margin: 25,
    textDecorationLine: "underline",
    color: "#11175A",
  },
  continue: {
    color: "#D1D1D6",
    textAlign: "center",
  },
  media: {
    margin: 22,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  mediaBtn: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderRadius: 6,
  },
  mediaBtnText: {
    paddingHorizontal: 10,
  },
  mediaIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  sendCodeView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  sendPwdText: {
    color: "#999999",
  },
  sendPwdTextBlue: {
    color: "#11175A",
    textDecorationLine: "underline",
  },
  mainView: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  bublyView: {
    backgroundColor: "#11175A",
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    position: "absolute",
    width: "100%",
    height: 450,
  },
  bublyIcon: {
    width: 250,
    height: 250,
    marginTop: 20,
    alignSelf: "center",
  },
  conditionsView: {
    marginHorizontal: 40,
  },
  conditionText: {
    fontSize: 14,
    color: "#999999",
  },
  conditionTextBlue: {
    fontSize: 14,
    color: "#11175A",
  },
});