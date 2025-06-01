import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Feather from '@expo/vector-icons/Feather'

import { signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '@/firebaseConfig'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)

  const signIn = async () => {
    if (email === undefined) {
      alert("Email is required");
      return;
    }
    else if (password === undefined) {
      alert("Passwords is required");
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) router.replace('/chats')
    } catch (error) {
      console.log(error)
      alert('Sign in failed')
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainView}>
          <StatusBar backgroundColor={"#11175A"} barStyle={'light-content'} />
          <View style={styles.bublyView}>
            <Image
              source={require("@/assets/logos/bubly-logo-alpha.png")}
              style={styles.bublyIcon}
            />
          </View>
          <View style={styles.viewStyle}>
            <Text style={styles.login}>Login</Text>

            {/* email */}
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

            {/* password */}
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

            <TouchableOpacity style={styles.touchBtn} onPress={signIn}>
              <Text style={styles.loginBtn}>Log in</Text>
            </TouchableOpacity>
            
            <Link style={styles.forgotPwd} href={'/forgot-password'}>
              <Text style={styles.forgotPwdText}>Forgot Password?</Text>
            </Link>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "#D1D1D6",
              }}
            />
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#D1D1D6",
                  paddingHorizontal: 16,
                }}
              >
                Or continue with
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "#D1D1D6",
              }}
            />
          </View>

          <View style={styles.media}>
            <TouchableOpacity style={styles.mediaBtn}>
              <Image
                source={require("@/assets/logos/google-logo.png")}
                style={styles.mediaIcon}
              />
              <Text style={styles.mediaBtnText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaBtn}>
              <Image
                source={require("@/assets/logos/apple-logo.png")}
                style={styles.mediaIcon}
              />
              <Text style={styles.mediaBtnText}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaBtn}>
              <Image
                source={require("@/assets/logos/facebook-logo.png")}
                style={styles.mediaIcon}
              />
              <Text style={styles.mediaBtnText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noAccView}>
            <Text>Have no account? </Text>
            <Link style={styles.noAccText} href={'/register'}>Sign up</Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login

const styles = StyleSheet.create({
  viewStyle: {
    margin: 20,
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 300,
  },
  login: {
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
  },
  forgotPwdText: {
    color: "#11175A",
    textDecorationLine: "underline",
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
    padding: 20,
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
});
