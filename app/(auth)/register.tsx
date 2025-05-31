import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'

import { createUserWithEmailAndPassword } from '@firebase/auth'
import { setDoc, collection, doc } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'

const Register = () => {
  const users = collection(db, 'users')
  const router = useRouter()
  const [name, setName] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined)

  // SignUp procedure
  const signUp = async () => {
    if (name === undefined) {
      alert("Name is required");
      return;
    }
    else if (email === undefined) {
      alert("Email is required");
      return;
    }
    else if (password === undefined) {
      alert("Passwords is required");
      return;
    }
    else if (confirmPassword === undefined) {
      alert("Confirm Passwords is required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      if (user) {
        await setDoc(doc(db, "users", user.user.uid), { name: name, email: email, avatar: '', status: 'online' })
        router.replace('/chats')
      } 
    } catch (error) {
      console.log(error)
      alert('Sign in failed: ' + error)
    }
  }

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
            <Text style={styles.register}>Sign Up</Text>

            {/* Name */}
            <View style={styles.viewInput}>
              <Ionicons name="person-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={"#BBBBBB"}
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email */}
            <View style={styles.viewInput}>
              <Ionicons name="mail-open-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"#BBBBBB"}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={styles.viewInput}>
              <Ionicons name="key-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={"#BBBBBB"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <Feather name="eye-off" style={styles.inputIcons} />
            </View>

            {/* Confirm Password */}
            <View style={styles.viewInput}>
              <Ionicons name="key-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={"#BBBBBB"}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
              />
              <Feather name="eye-off" style={styles.inputIcons} />
            </View>

            <TouchableOpacity style={styles.touchBtn} onPress={signUp}>
              <Text style={styles.loginBtn}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.conditionsView}>
            <Text style={styles.conditionText}>
              By signing up, you’re agree to our{" "}
              <Text style={styles.conditionTextBlue}>Terms & Conditions</Text>{" "}
              and
              <Text style={styles.conditionTextBlue}> Privacy Policy</Text>.
            </Text>
          </View>

          <View style={styles.noAccView}>
            <Text>Already have account? </Text>
            <Link style={styles.noAccText} href={'/login'}>Login</Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  viewStyle: {
    margin: 20,
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 300,
    paddingBottom: 30,
  },
  register: {
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
  loginBtn: {
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
  noAccView: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 40,
  },
  noAccText: {
    color: "#11175A",
    textDecorationLine: "underline",
    fontWeight: 'bold',
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
    fontSize: 12,
    color: "#999999",
  },
  conditionTextBlue: {
    fontSize: 12,
    color: "#11175A",
  },
})