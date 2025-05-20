import * as React from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
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

            <View style={styles.viewInput}>
              <Ionicons name="person-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={"#BBBBBB"}
              />
            </View>
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

            <View style={styles.viewInput}>
              <Ionicons name="key-outline" style={styles.inputIcons} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={"#BBBBBB"}
              />
            </View>

            <TouchableOpacity style={styles.touchBtn}>
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
            <Text style={styles.noAccText}>Login</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
});