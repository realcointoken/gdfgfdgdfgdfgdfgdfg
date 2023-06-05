import {PAGE_ALL_PROJECTS_PATH} from '../../router/constants'

export function getBreadcrumbs(currentItem) {
  return [
    {name: 'Projects', path: PAGE_ALL_PROJECTS_PATH},
    {
      name: currentItem.IDOContractNetwork,
      path: `${PAGE_ALL_PROJECTS_PATH}?network=${currentItem.IDOContractNetwork}`,
    },
    {name: currentItem.name},
  ]
}
