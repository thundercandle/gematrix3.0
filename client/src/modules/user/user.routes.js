import { Login } from './containers'
import { CoreLayout } from './../core'

export const UserRoutes = [{
  path: '/login',
  exact: true,
  component: Login,
  showNav: false,
  layout: CoreLayout,
  private: true
}]
