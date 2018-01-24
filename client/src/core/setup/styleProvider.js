import React from 'react'
import { StyleProvider } from 'native-base'

import getTheme from './../native-base-theme/components'
import variables from './../native-base-theme/variables/material'

export default ({ children }) => (
  <StyleProvider style={getTheme(variables)}>
    { children }
  </StyleProvider>
)
