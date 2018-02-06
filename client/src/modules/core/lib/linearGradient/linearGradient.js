import React from 'react'
import { LinearGradient as Gradient } from 'expo'

export const LinearGradient = ({ start={x: 0.5, y: 0}, end={x: 0.5, y: 1}, children, ...rest}) => {
  return (
    <Gradient start={[start.x, start.y]} end={[end.x, end.y]} { ...rest }>
      { children }
    </Gradient>
  )
}
