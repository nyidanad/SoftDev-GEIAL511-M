import { Redirect } from 'expo-router'
import { getAuth } from 'firebase/auth'

export default function App() {
  const auth = getAuth();
  const user = auth.currentUser;

  return <Redirect href={ user ? '/chats' : '/login' } />
}
