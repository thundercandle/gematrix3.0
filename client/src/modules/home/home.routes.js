import { Home } from './home'
import { CoreLayout } from './../core'

export const HomeRoutes = [{
  path: '/home',
  exact: true,
  component: Home,
  showNav: true,
  layout: CoreLayout
}]
