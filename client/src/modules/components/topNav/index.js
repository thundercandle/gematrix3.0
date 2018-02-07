import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
import { Header } from 'react-native-elements'

import {
  LinearGradient,
  PRIMARY_COLOR,
  PRIMARY_DARK
 } from './../../core'

export const Topnav = ({ location, history }) => (
    <LinearGradient
      colors={[PRIMARY_COLOR, PRIMARY_DARK]}
      start={{x: 0.0, y: 1}}
      end={{x: 0.5, y: 1.0}}
    >
      <Header outerContainerStyles={styles.topnav}>
        <Text style={styles.link}>Gematrix</Text>
      </Header>
    </LinearGradient>
)

const styles = StyleSheet.create({
  topnav: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    ...Platform.select({
      web: {
        height: 50
      }
    })
  },
  link: {
    color: 'white',
    ...Platform.select({
      web: {
        cursor: 'pointer'
      }
    })
  }
})
