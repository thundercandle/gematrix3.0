import { AppRegistry } from 'react-native'
// import { AppContainer } from 'react-hot-reloader'
import ionicons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

import { App } from './app'

// This is all a fix to get react-native-vector-icons working on web
const iconFontStyles = `@font-face {
  src: url(${ionicons});
  font-family: Material Icons;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') })
