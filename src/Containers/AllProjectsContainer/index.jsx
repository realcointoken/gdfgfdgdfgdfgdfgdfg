import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllProjects} from '../../store/actions/project'
import {useHistory} from 'react-router-dom'
import AllProjectsFilter from './AllProjectsFilter'
import AllProjectsList from './AllProjectsList'
import {PAGE_OVERVIEW_PATH} from '../../router/constants'
import cn from 'classnames'

import style from './AllProjectsContainer.module.scss'

export default function AllProjectsContainer(props) {
  const dispatch = useDispatch()
  const [projects, setProjects] = useState([])
  const [filters, setFilters] = useState(null)
  const isRequesting = useSelector(
    (state) => state.project.allProjects.requesting,
  )
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchAllProjects()).then((res) => {
      setProjects(res?.payload?.data?.all ?? [])
    })
  }, [dispatch])

  return (
    <div className={style.container}>
      <div className={style.panel}>
        {/* <AllProjectsFilter
          wrapperClass={style.head}
          data={filters}
          onChange={(data) => setFilters(data)}
        /> */}
        <div className={style.scrollContainer}>
          <AllProjectsList
            wrapperClass={cn(style.list, style.scroll)}
            items={projects}
            filter={filters}
            onSelect={(item) =>
              history.push(`${PAGE_OVERVIEW_PATH}/${item.id}`)
            }
            loading={isRequesting}
          />
        </div>
      </div>
    </div>
  )
}
