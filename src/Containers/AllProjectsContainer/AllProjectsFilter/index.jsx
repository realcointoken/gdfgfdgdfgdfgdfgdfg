// import {useEffect, useState} from 'react'
// import {useDispatch} from 'react-redux'
// import {fetchTotalTVL} from '../../../store/actions/project'
import cn from 'classnames'
import Form from '../../../components/Form'
import Field from '../../../components/Form/components/Field'
import {FORM_FIELD_TYPES} from '../../../components/Form/constants'
import {BLOCKCHAIN_TYPES_LIST} from '../../../constants'
import FieldGroup from '../../../components/Form/components/FieldGroup'
// import PseudoInput from '../../../components/Form/components/PseudoInput'
import search from './search.svg'

import style from './AllProjectsFilter.module.scss'

export default function AllProjectsFilter(props) {
  const {data, onChange, wrapperClass} = props
  // const dispatch = useDispatch()
  // const [totalTVL, setTotalTVL] = useState('0')
  const dropdownOptions = BLOCKCHAIN_TYPES_LIST.map((item) => ({
    label: item.name,
    value: item.slug,
    icon: item.icon,
  }))

  // useEffect(() => {
  //   dispatch(fetchTotalTVL()).then((res) => {
  //     // const data = res?.payload?.result ?? '0'
  //     // setTotalTVL(data)
  //   })
  // }, [dispatch])

  return (
    <Form
      data={data}
      onChange={onChange}
      wrapperClass={cn(style.container, wrapperClass)}
    >
      <FieldGroup wrapperClass={style.row}>
        <Field
          name={'query'}
          type={FORM_FIELD_TYPES.TEXT}
          placeholder={'Search by Coin'}
          light
          icon={search}
        />

        <Field
          name={'type'}
          type={FORM_FIELD_TYPES.DROPDOWN}
          defaultValue={dropdownOptions[0].value}
          placeholder={'All blockchains'}
          options={dropdownOptions}
          icon={''}
          wrapperClass={style.type}
        />

        {/* <PseudoInput light>
          <span>TVL:</span>
          <span>$ {totalTVL}</span>
        </PseudoInput> */}
      </FieldGroup>
    </Form>
  )
}
