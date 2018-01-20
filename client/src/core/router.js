import { Platform } from 'react-native'

//
// const routerApi = Platform.OS === 'web' ? WebRouter : NativeRouter
// const mainRouter = Platform.OS === 'web' ? WebRouter.BrowserRouter : NativeRouter.NativeRouter

const MainRouter = Platform.OS === 'web' ? require('react-router-dom') : require('react-router-native')

export default MainRouter
