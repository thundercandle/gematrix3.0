import React from 'react'

import { Container } from 'native-base'

import { TopNav } from './../../components'

export const CoreLayout = ({ children }) => (
  <Container>
    <TopNav/>
    { children }
  </Container>
)
