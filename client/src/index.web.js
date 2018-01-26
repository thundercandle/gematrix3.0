import { AppRegistry } from 'react-native'
// import { AppContainer } from 'react-hot-reloader'
import iconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';

import App from './app'

// This is all a fix to get react-native-vector-icons working on web
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Ionicons;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';

console.log(iconFontStyles)
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') })

//
// if(module.hot) {
//   module.hot.accept('./app', () => {
//     render(App)
//   })
// }
