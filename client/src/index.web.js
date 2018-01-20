import { AppRegistry } from 'react-native'
import iconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import { Setup } from './core'

// This is all a fix to get react-native-vectori-icons working on web
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Ionicons;
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

AppRegistry.registerComponent('Setup', () => Setup)
AppRegistry.runApplication('Setup', { rootTag: document.getElementById('root') })
