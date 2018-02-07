import React from 'react'
import { Icon } from 'react-native-elements'

import { BRAND_COLOR } from './../../../core'

export const Logo = () => (
  <Icon
    name='ios-planet'
    type='ionicon'
    color={ BRAND_COLOR }
    size={165}
  />
)
