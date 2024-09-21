import { View, Text, StyleSheet, ImageBackground, SafeAreaView, Image, StatusBar } from 'react-native'
import { useRouter } from 'expo-router'
import promptPlaceholder from '@/assets/game-assets/board.png'
import newPromptButton from '@/assets/game-assets/button-reload.png'
import buttonCallVote from '@/assets/game-assets/button-call-vote.png'
import prompts from '@/assets/prompts.json'
import { useEffect, useLayoutEffect, useState } from 'react'
import BoardButton from '@/components/BoardButton'
import GameButton from '@/components/gameButton'
import { transform } from '@babel/core'
import { useFonts } from 'expo-font'
//component snipper rnfe -> arrow function component
import { AnimatedCircularProgress } from 'react-native-circular-progress'
export default function HomeScreen() {

  const [fontsLoaded] = useFonts({
    'JustMeAgainDownHere-Regular': require('../assets/fonts/JustMeAgainDownHere-Regular.ttf')
  })

  const gameTime = 60
  const [random, setRandom] = useState(0)
  const [timer, setTimer] = useState(100)
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v'];

  const randomBtn = () => {
    setTimer(100)
    setRandom(Math.floor(Math.random() * prompts.prompts.length))
  }

  useEffect(() => {
    randomBtn()
  }, [])

  useEffect(() => {

    if (timer === gameTime) {
      setTimer(0)
    }

    if (timer <= gameTime) {
      setTimeout(() => {
        setTimer(timer - (100 / gameTime))
      }, 1000)
    }

  }, [timer])

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return (
    <View style={styles.layout}>
      <StatusBar hidden={true} />
      <View style={styles.boardLayout}>
        <BoardButton style={styles.button} path={newPromptButton} onPress={() => randomBtn()} />
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>{prompts.prompts[random]}</Text>
          <Image style={styles.promptPlaceholder} source={promptPlaceholder} />
          <AnimatedCircularProgress
            size={500}
            width={20}
            fill={timer}
            tintColor="#F01C1F"
            backgroundColor="#FF4B4E"
            style={styles.timer}
          />
        </View>
        <BoardButton style={styles.button} path={buttonCallVote} />
      </View>
      <View style={styles.boardButtons}>
        {letters.reverse().map((letter, index) => {
          const angle = (360 / letters.length) * index;
          const x = centerX + radius * Math.cos(angle * Math.PI / 180);
          const y = centerY + radius * Math.sin(angle * Math.PI / 180);

          return (
            <GameButton
              xt={x}
              yt={y}
              transform={[{ rotate: `${angle - 90}deg` }]}
              item={letter.toUpperCase()}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
}

//NOTE: fix the no response when touching a button

const radius = 335
const containerRadius = 655
const centerX = 290 // V these two can be dynamic if i get ahold of the devices dimensions.
const centerY = 265
const textWidth = 400

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F01C1F',
    padding: 20,
  },
  timer: {
    position: 'absolute',
    zIndex: 100,
  },
  boardLayout: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 500,
    width: 500,
    maxHeight: 500,
    marginTop: 90,
    marginBottom: 90,
    zIndex: 10,
  },
  boardButtons: {
    position: 'absolute',
    width: containerRadius,
    height: containerRadius,
    borderRadius: 500,
    transform: [{ rotate: `${195}deg` }],
    borderColor: 'blue',
    borderWidth: 3,
    zIndex: 1,
  },
  button: {
    position: 'relative',
    transform: 'scale(0.65)',
    zIndex: 20,
  },
  promptContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    borderColor: 'blue',
  },
  promptPlaceholder: {
    position: 'absolute',
    transform: 'scale(0.50)',
    zIndex: 10,
  },
  promptText: {
    position: 'absolute',
    textAlign: 'center',
    left: -190,
    top: -20,
    paddingTop: 35,
    minHeight: 200,
    minWidth: textWidth,
    maxWidth: textWidth,
    fontSize: 90,
    lineHeight: 65,
    zIndex: 30,
    fontFamily: 'JustMeAgainDownHere-Regular',
    borderWidth: 2,
    borderColor: 'blue',
  },
})
