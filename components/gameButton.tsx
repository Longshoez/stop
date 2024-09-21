import React, { useState } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'

import gameButton from '../assets/game-assets/button.png'
import gameButtonDisabled from '../assets/game-assets/button-pressed.png'

const GameButton = ({ xt, yt, transform, item }: { xt: number, yt: number, transform: any, item: string }) => {

  const [pressed, setPressed] = useState(false)

  const style = StyleSheet.create({
    imageStyles: {
      position: 'absolute',
      width: 210,
      height: 280,
      transform: 'scale(0.5)',
    },
    positioning: {
      position: 'absolute',
      width: 70,
      height: 120,
      borderRadius: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      left: xt,
      top: yt,
      transform: transform,
      opacity: pressed ? 0.6 : 1,
    },
    font: {
      top: -20,
      fontSize: 90,
      fontFamily: 'JustMeAgainDownHere-Regular',
      opacity: pressed ? 0.2 : 1,
    }
  })

  return (
    <TouchableOpacity style={style.positioning} onPress={() => setPressed(!pressed)} >
      <Image style={style.imageStyles} source={!pressed ? gameButton : gameButtonDisabled} />
      <Text style={style.font}>{item}</Text>
    </TouchableOpacity>

  )
}

export default GameButton
