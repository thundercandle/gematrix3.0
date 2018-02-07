import React from 'react'
import { Topnav, Container } from './../../components'

// Possible example of a layout component working with react-router
// Not sure yet on passing through functions that change state, such as
// showing back arrows to navigate backwards

export const CoreLayout = ({children, history, location, showNav=true}) => {
  return (
    <Container>
      { showNav && <Topnav history={history} location={location}/>}
      { children }
    </Container>
  )
}
