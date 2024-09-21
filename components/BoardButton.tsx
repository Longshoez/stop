import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

const BoardButton = ({ style, path, onPress }: { style: any, path: any, onPress?: any }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={style} source={path} />
    </TouchableOpacity>

  )
}

export default BoardButton
