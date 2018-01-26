import React from 'react'

import {
  Grid,
  Col,
} from 'native-base'

export const DesktopContainer = ({children}) => (
  <Grid>
    <Col></Col>
    <Col>
      {children}
    </Col>
    <Col></Col>
  </Grid>
)
