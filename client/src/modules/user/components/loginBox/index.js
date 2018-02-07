import React from 'react'
import { View, KeyboardAvoidingView } from 'react-native'

import { MediaQuery, breakpoints } from './../../../core'
import { styles } from './loginBox.styles'

export const LoginBox = ({ children }) => (
  <MediaQuery isSmaller={breakpoints.largeMobile}>
    { isSmaller => isSmaller
      ?
      <View style={{padding: 10}}>
        { children }
      </View>
      :
      <View style={styles.box}>
          { children }
      </View>
    }
  </MediaQuery>
)
