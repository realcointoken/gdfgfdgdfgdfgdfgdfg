import {PAGE_HOME_PATH} from '../../../router/constants'

export function isMenuDark(pathname) {
  switch (pathname) {
    case PAGE_HOME_PATH: {
      return true
    }
    default: {
      return false
    }
  }
}
