import React from 'react'
import { View, KeyboardAvoidingView } from 'react-native'

import { MediaQuery, breakpoints } from './../../../core'
import { styles } from './loginBox.styles'

export const LoginBox = ({ children }) => (
  <MediaQuery isSmaller={breakpoints.largeMobile}>
    { isSmaller => isSmaller
      ?
      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
        behavior='padding'
      >
        { children }
      </KeyboardAvoidingView>
      :
      <View style={styles.box}>
          { children }
      </View>
    }
  </MediaQuery>
)
