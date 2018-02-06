import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
import { Header } from 'react-native-elements'

import {
  LinearGradient,
  PRIMARY_COLOR,
  SECONDARY_COLOR
 } from './../../core'

export const TopNav = ({ location, history }) => (
    <LinearGradient colors={[PRIMARY_COLOR, SECONDARY_COLOR]}>
    { console.log(LinearGradient) }
      <Header outerContainerStyles={styles.topnav}>
        <Text style={styles.link}>Gematrix</Text>
      </Header>
    </LinearGradient>
)

const styles = StyleSheet.create({
  topnav: {
    backgroundColor: 'transparent',
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
