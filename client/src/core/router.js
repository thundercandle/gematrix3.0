import { Platform } from 'react-native'

const isWeb = Platform.OS === 'web'
const baseRouter = isWeb ? require('react-router-dom') : require('react-router-native')

export const Router = isWeb ? baseRouter.BrowserRouter : baseRouter.NativeRouter
export const Link = baseRouter.Link
