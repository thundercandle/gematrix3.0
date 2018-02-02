import React, { Component } from 'react'
import * as Expo from 'expo'

import { App } from './app'

class NativeApp extends Component {
  constructor() {
    super()
    this.state = {
      isReady: false
    }
  }

  componentWillMount() {
    this.loadFonts()
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      'Material Icons': require("@expo/vector-icons/fonts/MaterialIcons.ttf")
    })
    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }
    return (
      <App/>
    )
  }
}

Expo.registerRootComponent(NativeApp)
