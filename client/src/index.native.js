import React from 'react';
import Expo from 'expo';

import Main from './main'

global.self = global.self ? global.self : global

Expo.registerRootComponent(Main)
