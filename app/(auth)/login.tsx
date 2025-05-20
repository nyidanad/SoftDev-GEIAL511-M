import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
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
            <Text style={styles.login}>Login</Text>

            <View style={styles.viewInput}>
              <Ionicons name="mail-open-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"#BBBBBB"}
              />
            </View>
            <View style={styles.viewInput}>
              <Ionicons name="key-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={"#BBBBBB"}
              />
            </View>
            <TouchableOpacity style={styles.touchBtn}>
              <Text style={styles.loginBtn}>Log in</Text>
            </TouchableOpacity>

            <Text style={styles.forgotPwd}>Forgot Password?</Text>
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
            <Text style={styles.noAccText}>Sign up</Text>
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
    padding: 20,
  },
  noAccText: {
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
});
