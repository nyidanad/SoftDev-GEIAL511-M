import { ColorValue, View } from 'react-native'
import React from 'react'

type hrProps = {
  color: ColorValue
  marginTop?: number
  marginBottom?: number
}

const hr = ({color, marginTop, marginBottom}: hrProps) => {
  return (
    <View 
      style={{
        width: '100%',
        borderBottomColor: color,
        borderBottomWidth: 1,
        marginTop: marginTop,
        marginBottom: marginBottom
      }}
    />
  )
}

export default hr