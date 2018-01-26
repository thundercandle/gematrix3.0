import { Platform } from 'react-native'

// This file is used as a translation source to work with both react-router-dom
// and react-router-native.

const isWeb = Platform.OS === 'web'
const baseRouter = isWeb ? require('react-router-dom') : require('react-router-native')

export const Router = isWeb ? baseRouter.BrowserRouter : baseRouter.NativeRouter
export const Link = baseRouter.Link
