import { FontAwesome, Ionicons } from '@expo/vector-icons'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

type Props = {
  searchVisible: boolean
  setSearchVisible: Dispatch<SetStateAction<boolean>>
  searchText: string
  setSearchText: (text: string) => void
}

const SearchBar = ({ searchVisible, setSearchVisible, searchText, setSearchText }: Props) => {
  const widthAnim = useRef(new Animated.Value(0)).current

  const handleClose = () => {
    setSearchVisible(false)
    setSearchText('')
  }

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: searchVisible ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [searchVisible])

  return (
    <Animated.View style={[
      styles.container,
      {
        width: widthAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0%', '85%'],
        }),
        opacity: widthAnim,
      }
    ]}>
      <View style={styles.textinput}>
        <FontAwesome name='search' style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleClose}>
        <Ionicons name='close' style={styles.icon} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: 999,
    paddingHorizontal: 15,
  },
  textinput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    color: '#11175A',
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    color: '#363636',
  },
  icon: {
    color: '#363636',
    fontSize: 18
  }
})
