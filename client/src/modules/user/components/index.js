import React from 'react'
import { View } from 'react-native'

import {
  Grid,
  Col,
} from 'native-base'

import { MediaQuery, breakpoints } from './../../core'

export const LoginLayout = ({children}) => (
  <MediaQuery query={breakpoints.largeMobile}>
    {isSmall => isSmall
      ? <View>{ children }</View>
      :  <Grid>
          <Col></Col>
          <Col>
            {children}
          </Col>
          <Col></Col>
        </Grid>
    }
  </MediaQuery>
)
