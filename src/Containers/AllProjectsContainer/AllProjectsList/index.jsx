import React, {useContext, useEffect, useRef, useState} from 'react'
import style from './AllProjectsList.module.scss'
import cn from 'classnames'
import NoImage from '../../../assets/img/noimage.svg'
import blueDot from '../../../assets/img/staking_page/blueDot.png'
import downArrow from '../../../assets/img/staking_page/select_arrow.png'
import CoinAvatar from '../../../components/CoinAvatar'
import Form from '../../../components/Form'
import Field from '../../../components/Form/components/Field'
import {FORM_FIELD_TYPES} from '../../../components/Form/constants'
import FieldGroup from '../../../components/Form/components/FieldGroup'
import search from './search.svg'
import {BLOCKCHAIN_TYPES_LIST} from '../../../constants'
import ProgressBar from '../../../components/ProgressBar'
import StatusLabel from '../../../components/StatusLabel'
import moment from 'moment'
import Pagination from '../../../components/Pagination'
import {isEmpty, get} from 'lodash'

import {formatUnits} from '../../../store/constants/web3'
import {AppContextType} from '../../../context/context_types'
import {useHistory} from 'react-router'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import axios from 'axios'

export default function AllProjectsList(props) {
  const {
    wrapperClass,
    filter,
    items = [],
    pageLength = 10,
    loading,
    onSelect,
  } = props
  // const [page, setPage] = useState(1)
  const [filterItems, setFilterItems] = useState([])
  const {isMobile} = useContext(AppContextType)
  const history = useHistory()
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const [rows, setRows] = useState([])
  const [data, setData] = useState(props.data)
  const [searchedRows, setSearchedRows] = useState([])
  const ref = useRef(null)
  // const kycStatusData = useSelector((state) => state.current.response.kycStatus)
  const dispatch = useDispatch()
  var totalaData

  const handleSearchChange = (value) => {
    console.log(value)

    const filterdData = data.filter((item) =>
      item.projectName.toLowerCase().includes(value.toLowerCase()),
    )
    setSearchedRows(filterdData)
  }

  const dropdownOptions = BLOCKCHAIN_TYPES_LIST.map((item) => ({
    label: item.name,
    value: item.slug,
    icon: item.icon,
  }))

  useEffect(() => {
    if (filter && !isEmpty(filter)) {
      let newItems = items
      if (filter.type && filter.type !== 'all') {
        newItems = items.filter(
          (item) => item.IDOContractNetwork === filter.type,
        )
      }
      if (filter.query) {
        newItems = newItems.filter((item) =>
          item.name.toLowerCase().includes(filter.query.toLowerCase()),
        )
      }
      setFilterItems(newItems)
    } else {
      setFilterItems(items)
    }
  }, [filter, items])

  useState(() => {
    axios
      .get(httpUrl + '/api/v1/Pool/GetAllPools')
      .then((response) => {
        const rows = response.data.data
        rows.sort(function (a, b) {
          return b.id - a.id
        })
        setData(rows)
        setSearchedRows(rows)
      })
      .catch((error) => {
        console.log('this  is error data')
        console.log(error)
      })
  }, [])

  // const onPageUpdate = (page) => {
  //   setPage(page)
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth',
  //   })
  // }

  const doFilterData = (value) => {
    if (value != 'All') {
      const row = data.filter((data) => data.blockChainName === value)

      setSearchedRows(row)
    } else {
      setSearchedRows(data)
    }
  }

  return (
    <>
      <div className='container-fluid'>
        <Form data={data} wrapperClass={cn(style.container, wrapperClass)}>
          <FieldGroup wrapperClass={style.row}>
            <Field
              name={'query'}
              type={FORM_FIELD_TYPES.TEXT}
              placeholder={'Search by Coin'}
              light
              onChange={(e) => handleSearchChange(e)}
              icon={search}
            />
            {/* 
            <Field
              name={'type'}
              type={FORM_FIELD_TYPES.DROPDOWN}
              defaultValue={dropdownOptions[0].value}
              placeholder={'All blockchains'}
              options={dropdownOptions}
              // onChange={(e) => doFilterData(e)}
              icon={''}
              wrapperClass={style.type}
            /> */}

            <select
              style={{
                width: '100%',
                borderRadius: 5,
                backgroundColor: '#343D56',
              }}
              onChange={(e) => doFilterData(e.target.value)}
              className={style.type}
            >
              <option hidden>All Blockchain</option>
              <option value='All'>All Blockchain</option>
              <option value='Binance Smart Chain'>Binance Smart Chain</option>
              <option value='Ethereum'>Ethereum</option>
              <option value='Polygon'>Polygon</option>
              <option value='Avalanche'>Avalanche</option>
            </select>

            {/* <PseudoInput light>
          <span>TVL:</span>
          <span>$ {totalTVL}</span>
        </PseudoInput> */}
          </FieldGroup>
        </Form>
        <div
          className={cn(style.container, wrapperClass, {
            [style.loading]: loading,
          })}
        >
          {/* <ul className={style.head}>
        <li className={style.heading}>Name</li>
        <li className={style.heading}>Blockchain</li>
        <li className={style.heading} id={style.none}>
          Price
        </li>
        <li className={style.heading} id={style.none}>
          Progress
        </li>
        <li className={style.heading} id={style.none}>
          Status
        </li>
        <li className={style.heading} id={style.none}>
          Tokens Available
        </li>
      </ul> */}
          {/* <ul className={style.list}> */}
          {/* {(loading ? new Array(5).fill({}) : filterItems)
          .slice((page - 1) * pageLength, pageLength * page)
          .map((item, i) => {
            const daysToComplete =
              moment(item.launchDate).diff(moment.now(), 'days') + 1
            const blockchain =
              BLOCKCHAIN_TYPES_LIST?.find(
                (type) => type.slug === item.IDOContractNetwork,
              ) ?? {}
            const totalRaise = Number(get(item, 'totalRaise', 0))
            const availableForPurchase = Number(
              get(item, 'availableForPurchase', 0),
            )
            const exchangeRatio = totalRaise / availableForPurchase
            const contractTotalRaise = get(item, 'contractTotalRaise', 0)
            const tokenDecimals = get(item, 'tokenDecimals', 18)
            const total = get(item, 'totalRaise', 0)
            const progress =
              formatUnits(contractTotalRaise, tokenDecimals) / total

            return (
              <li
                role='button'
                className={style.listItem}
                key={i}
                onClick={() => onSelect(item)}
              >
                <div className={style.listItemCell}>
                  <CoinAvatar
                    wrapperClass={style.coinPicture}
                    showBlockchain={false}
                    image={item.logoUrl}
                  />
                  <span
                    className={style.textOverflowContainer}
                    title={blockchain.name}
                  >
                    {item.name}
                  </span>
                  <span
                    className={style.textOverflowContainer}
                    title={item.symbol}
                  >
                    {item.symbol}
                  </span>
                </div>

                <div className={style.listItemCell}>
                  <div className={style.blockchainIconContainer}>
                    <img
                      src={blockchain.icon}
                      alt=''
                      className={style.blockchainIcon}
                    />
                  </div>
                  <span
                    className={style.textOverflowContainer}
                    title={blockchain.name}
                  >
                    {blockchain.label}
                  </span>
                </div>

                {!isMobile && (
                  <>
                    {/* TODO: connect API*/}
          {/* <div className={style.listItemCell}>
                      <div className={style.textOverflowContainer}>
                        1 {item.symbol} = {exchangeRatio}{' '}
                        {item.acceptedTokenSymbol}
                      </div>
                    </div> */}

          {/* TODO: connect API*/}
          {/* <div className={style.listItemCell}>
                      <div className={style.percentValue}>
                        {progress
                          ? Number(progress * 100).toFixed() + '%'
                          : '0%'}
                      </div>
                      <ProgressBar
                        wrapperClass={style.progress}
                        progress={progress}
                        loading={loading}
                      />
                    </div>

                    <div className={style.listItemCell}>
                      <StatusLabel
                        text={'Live'}
                        loading={loading}
                        isLive={true}
                      /> */}

          {/* TODO: uncomment (and remove above) when the backend returns proper isComplete property */}
          {/*<StatusLabel*/}
          {/*  wrapperClass={*/}
          {/*    item.isComplete ? style.labelComplete : ''*/}
          {/*  }*/}
          {/*  text={*/}
          {/*    item.isComplete*/}
          {/*      ? 'Completed'*/}
          {/*      : `in ${daysToComplete} ${*/}
          {/*          daysToComplete === 1 ? 'day' : 'days'*/}
          {/*        }`*/}
          {/*  }*/}
          {/*  loading={loading}*/}
          {/*/>*/}
          {/* </div>

                    <div className={style.listItemCell}>
                      <div className={style.textOverflowContainer}>
                        {item.availableForPurchase}
                      </div>
                    </div> */}
          {/* </> */}
          {/* )}  */}
          {/* </li> */}
          {/* ) */}
          {/* })} */}
          {/* </ul> */}

          <table style={{width: '100%'}}>
            <tr>
              <th>Pool name</th>
              <th>Price(USDT)</th>
              <th>Staked</th>
              <th>Progress</th>
              <th>
                {/* <select
                  style={{width: '150px'}}
                  onChange={(e) => doFilterData(e.target.value)}
                >
                  <option hidden>Status</option>
                  <option value='All'>All</option>
                  <option value='Confirmed'>Confirmed</option>
                  <option value='Pending'>Pending</option>
                </select> */}
                Status
              </th>
              <th style={{width: '150px'}}>Tokens Available</th>
            </tr>

            <tbody>
              {searchedRows?.map((data) => {
                return (
                  data.adminStatus === 'Verified' && (
                    <tr
                      style={{color: '#FFFFFF', cursor: 'pointer'}}
                      onClick={() => {
                        history.push(`/pooldetail/${data.id}`)
                      }}
                    >
                      <td className='d-flex' style={{paddingRight: '15px'}}>
                        <img
                          src={
                            data?.image ? `${httpUrl}/${data?.image}` : NoImage
                          }
                          alt='icon'
                          width='42px'
                          height='42px'
                          style={{marginRight: '8px'}}
                        />
                        <div
                          className='d-flex flex-column '
                          style={{width: '100%'}}
                        >
                          <span
                            className={style.project_name}
                            style={{
                              width: '80%',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {data?.projectName}
                          </span>
                          <span className={style.project_token_name}>
                            {data?.title}
                          </span>
                        </div>
                      </td>
                      <td
                        className={
                          'cell' + ' ' + style.price_stakes_tokensavaliable
                        }
                      >
                        <span>$ {data.tokenRate}</span>
                      </td>
                      <td
                        className={
                          'cell' + ' ' + style.price_stakes_tokensavaliable
                        }
                      >
                        <span>$ {data?.remainingSupplyAmount}</span>
                      </td>
                      <td
                        style={{minWidth: '150px', maxWidth: '200px'}}
                        className='cell'
                      >
                        {/* <div
                      style={{position: 'relative', bottom: '10px'}}
                      ref={ref}
                    > */}
                        {/* <div
                      style={{
                        display: 'inline-block',
                        textAlign: 'center',
                        padding: '0px',
                        // width: ref.current?.offsetWidth,
                        position: 'relative',
                        bottom: '13px',
                      }}
                    > */}
                        <div className='row justify-content-between flex-row  ms-0'>
                          <div className='col-1'>
                            <p style={{fontSize: '10px'}}>Min</p>
                            <span
                              style={{
                                display: 'block',
                                position: 'relative',
                                bottom: '25px',
                              }}
                            >
                              <img
                                src={downArrow}
                                alt='down'
                                width='10px'
                                height='8px'
                              />
                            </span>
                          </div>

                          <div className='col-1 me-2'>
                            <p style={{fontSize: '10px'}}>Max</p>
                            <span
                              style={{
                                display: 'block',
                                position: 'relative',
                                bottom: '25px',
                              }}
                            >
                              <img
                                src={downArrow}
                                alt='down'
                                width='10px'
                                height='8px'
                              />
                            </span>
                          </div>

                          {/* </div> */}
                          {/* </div> */}

                          <div style={{marginTop: -20}}>
                            <ProgressBar
                              now={
                                100 -
                                (data?.remainingSupplyAmount /
                                  data?.supplyAmount) *
                                  100
                              }
                              style={{
                                borderRadius: '30px',
                                backgroundColor: 'white',
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className='cell'>
                        <div
                          style={{
                            border: '1px solid #FFFFFF33',
                            display: 'inline-block',
                            borderRadius: '32px',
                            padding: '2px 8px',
                          }}
                        >
                          <div className={style.status_wrap}>
                            <img style={{paddingRight: '8px'}} src={blueDot} />
                            <span className={style.timevalue}>
                              {data?.supplyTransactionStatus}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className={
                          'cell' + ' ' + style.price_stakes_tokensavaliable
                        }
                      >
                        {data.supplyAmount}
                      </td>
                    </tr>
                  )
                )
              })}
            </tbody>
          </table>
        </div>
        {/* {items && items.length > pageLength && (
        <div className={style.pagination}>
          <Pagination
            className={style.paginator}
            current={page}
            pageSize={pageLength}
            total={items && items.length}
            onChange={onPageUpdate}
          />
        </div>
      )} */}
      </div>
    </>
  )
}
