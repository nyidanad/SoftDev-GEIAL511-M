import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='login' options={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        animation: 'ios_from_right'
      }} />
      <Stack.Screen name='register' options={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        animation: 'ios_from_right',

      }} />
      <Stack.Screen name='forgot-password' options={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        animation: 'ios_from_right',
      }} />
      <Stack.Screen name='change-password' options={{
        headerShown: false,
        animationTypeForReplace: 'pop',
        animation: 'ios_from_right',
      }} />
    </Stack>
  )
}

export default AuthLayout