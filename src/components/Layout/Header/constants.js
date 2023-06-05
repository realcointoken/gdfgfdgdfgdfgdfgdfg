import {
  PAGE_HOME_PATH,
  PAGE_GOVERNANCE_PATH,
  PAGE_ABOUT_PATH,
  PAGE_APPLY_PATH,
  PAGE_LOGIN_PATH,
  PAGE_STAKING_PATH
} from '../../../router/constants'

export const HEADER_NAVIGATION_ITEMS = [
  {name: 'Explore', path: PAGE_STAKING_PATH},
  {name: 'Governance', path: '#', external: true},
  {name: 'About', path: PAGE_ABOUT_PATH},
  {name: 'Apply', path: PAGE_APPLY_PATH},
  // {name: 'Login', path: PAGE_LOGIN_PATH},
]
