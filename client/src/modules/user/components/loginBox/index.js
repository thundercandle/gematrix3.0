import React from 'react'
import { View } from 'react-native'

import {
  MediaQuery,
  breakpoints,
  PADDING_SM
} from './../../../core'
import { styles } from './loginBox.styles'

export const LoginBox = ({ children }) => (
  <MediaQuery isSmaller={breakpoints.largeMobile}>
    { isSmaller => isSmaller
      ?
      <View style={{padding: PADDING_SM}}>
        { children }
      </View>
      :
      <View style={styles.box}>
          { children }
      </View>
    }
  </MediaQuery>
)
