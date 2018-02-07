import { AppRegistry } from 'react-native'
// import { AppContainer } from 'react-hot-reloader'
import material from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';


import { App } from './app'

// This is all a fix to get react-native-vector-icons working on web
const addFont = (font, fontName) => {
  const iconFontStyles = `@font-face {
    src: url(${font});
    font-family: ${fontName};
  }`;

  // Create stylesheet
  const style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }

  document.head.appendChild(style);
}

addFont(material, 'Material Icons')
addFont(ionicons, 'Ionicons')

AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') })
