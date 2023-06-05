import React, {useEffect, useState} from 'react'
import {useTable} from 'react-table'
import {Table, Menu, Dropdown, Select, Progress, message} from 'antd'
import style from './whitelistlabel.module.scss'
import axios from 'axios'
import {Modal, Button} from 'antd'
import {FORM_FIELD_TYPES} from '../../components/Form/constants'
import Form from 'rc-field-form/es/Form'
import {Field} from 'rc-field-form'
import {height} from 'dom-helpers'
import {useDispatch, useSelector} from 'react-redux'
import {Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router'
import localforage from 'localforage'
import {current} from '../../store/actions/current'

const WhiteLabelAddress = () => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const [fractalData, setFractalData] = useState()
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [error, setError] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [apiResponse, setApiResponse] = useState('')
  const [filter, setFilter] = useState('all')
  const [inProgress, setInProgress] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isNoteEmpty, setIsNoteEmpty] = useState(false)
  const [selectedBlockChain, setSelectedBlockChain] = useState()
  const kycStatusData = useSelector((state) => state.current.response.kycStatus)
  const dispatch = useDispatch()
  const whiteLabelListState = useSelector(
    (state) => state.whiteLabelList.response,
  )

  const blockchainList = useSelector((state) => state.blockchain.blockchainData)

  const history = useHistory()
  useEffect(() => {
    if (blockchainList?.length > 0) {
      setSelectedBlockChain(blockchainList[0].chainID)
    }
  }, [])

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  React.useEffect(() => {
    // setTimeout(() => {
    //   if (!fractalData?.access_token) {
    //     history.push('/kyc')
    //   }
    // }, 500)

    // localforage.getItem('persist:fractal').then((value) => {
    //   var fractal = JSON.parse(JSON.parse(value).response)?.data
    //   setFractalData(fractal)
    //   console.log('valueee', fractal)
    //   if (!fractal || (fractal && Object.keys(fractal).length == 0)) {
    //     history.push('/kyc')
    //   }
    // })

    var loginStatus = localStorage.getItem('isLogin')
    if (loginStatus) {
      setTimeout(() => {
        dispatch(current())
          .then(() => {
            localStorage.setItem('isLogin', true)
          })
          .catch(() => {
            // localStorage.removeItem('isLogin')
            // return history.push('/login')
          })
      }, 2000)
    } else {
      // localStorage.removeItem('isLogin')
      // return history.push('/login')
    }

    if (
      kycStatusData == 'rejected' ||
      kycStatusData == 'pending' ||
      kycStatusData == 'submitted'
    ) {
      history.push('/kyc')
    }

    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)
  }, [])

  // var d = data
  // if (filter != 'all') d = data.filter((data) => data.name === filter)

  const filterWhitelabelAddress = (value) => {
    // var d = data
    if (value !== 'all') {
      setFilterData(data.filter((data) => data.blockChainName === value))
    } else {
      setFilterData(data)
    }
    // }
  }

  const [labelData, setLabelData] = useState({
    Name: 'Ethereum',
    Address: '',
    BlockchainId: 0,
    IsWallet: true,
    chainId: 3,
    Note: '',
  })

  const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />

  const registerWhiteLabel = (e) => {
    e.preventDefault()
    if (labelData.Address.length == 0) {
      setIsEmpty(true)
      return
    } else setIsEmpty(false)
    if (labelData.Note.length == 0) {
      setIsNoteEmpty(true)
      return
    } else setIsNoteEmpty(false)

    // if (labelData.Name === 'Ethereum') {

    console.log('selectedBlockChainselectedBlockChain', selectedBlockChain)
    setLabelData((prev) => {
      return {...prev, BlockchainId: selectedBlockChain}
    })
    // } else if (labelData.Name === 'Binance Smart Chain') {
    //   setLabelData((prev) => {
    //     return {...prev, BlockchainId: 4}
    //   })
    // }

    console.log(labelData)
    setInProgress(true)

    var bodyFormData = new FormData()
    bodyFormData.append('Name', labelData.Name)
    bodyFormData.append('Address', labelData.Address)
    bodyFormData.append('BlockchainId', selectedBlockChain)
    bodyFormData.append('IsWallet', labelData.IsWallet)
    bodyFormData.append('chainId', labelData.chainId)
    bodyFormData.append('Note', labelData.Note)
    axios
      .post(
        httpUrl + '/api/v1/WhiteLabelAddress/AddWhiteLabelAddress',
        bodyFormData,
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setModalVisible(false)
          message.success('Address is added successfully')
        }
        setInProgress(false)
        setApiResponse(response)
        console.log('this is respone')
        console.log(response.data.data)
      })
      .catch((error) => {
        message.error(error.data.message)
        setInProgress(false)
        setApiResponse(error)
        //setAddedResponse(error)
        setModalVisible(false)
        console.log('this is error')
        console.log(error)
      })
  }

  const handleSelectForm = (event) => {
    const {name, value} = event.target

    console.log(value)
    const ExtractedBlockchain = blockchainList.find(
      (data) => data.chainID == value,
    )

    setSelectedBlockChain(ExtractedBlockchain.chainID)
    setLabelData((prev) => {
      return {
        ...prev,
        Name: ExtractedBlockchain.name,
        chainId: ExtractedBlockchain.chainID,
      }
    })
  }

  const handleFormData = (event) => {
    const {name, value} = event.target

    if (name === 'Address') {
      if (value.length > 0) {
        setIsEmpty(false)
      } else setIsEmpty(true)
    }

    if (name === 'Note') {
      if (value.length > 0) {
        setIsNoteEmpty(false)
      } else setIsNoteEmpty(true)
    }

    setLabelData((prev) => {
      return {...prev, [name]: value}
    })

    // if (name === 'Name') {
    //   setSelectedBlockChain(value)
    // }

    console.log('labelData', labelData)
  }

  const closeModal = () => {
    setModalVisible(false)
  }
  const columns = [
    {
      Header: 'Date',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Address',
      accessor: 'col2',
    },
    {
      Header: 'Label',
      accessor: 'col3',
    },
    {
      Header: 'Note',
      accessor: 'col4',
    },
    {
      Header: 'Blockchain',
      accessor: 'col5',
    },

    {
      Header: '',
      accessor: 'col6',
    },
  ]

  const deleteAddress = (uuid) => {
    axios
      .post(
        httpUrl +
          `/api/v1/WhiteLabelAddress/DeleteWhiteLabelAddress?uuid=${uuid}`,
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setApiResponse(response)
          message.success('Address is deleted successfully')

          var haveToDelete = data.find((data) => data.uuid == uuid)
          console.log(data.indexOf(haveToDelete))
          data.splice(data.indexOf(haveToDelete), 1)
          var updatedData = [...data]
          console.log('prooooooo', data)
          setData(updatedData)
          setFilterData(updatedData)
        }
      })
      .catch((error) => {
        message.error(error.data.message)
        setApiResponse(error)
      })
  }

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(httpUrl + '/api/v1/WhiteLabelAddress/GetWhiteLabelAddress')
        .then((response) => {
          const rows = response.data.data

          setData(rows.reverse())

          setFilterData(response?.data?.data)
        })
        .catch((error) => {
          setData([])
          console.log(error)
        })
    }, 2000)
  }, [apiResponse, filter])

  useEffect(() => {
    setLabelData(labelData)
  }, [labelData])
  // console.log('data', data)
  return (
    <div
      className={style.main}
      style={{overflowX: dimensions.width >= 768 ? 'auto' : 'scroll'}}
    >
      <div style={{textAlign: 'center'}}>
        <h1>Favourite Address</h1>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
        }}
      >
        <button
          onClick={() => {
            setIsEmpty(false)
            setIsNoteEmpty(false)
            setModalVisible(true)
            setLabelData((prev) => {
              return {...prev, BlockchainId: selectedBlockChain}
            })
          }}
          className={style.btn_addnew_label}
        >
          Add New Address
        </button>

        <select
          onChange={(e) => {
            filterWhitelabelAddress(e.target.value)
            // setFilter(e.target.value)
          }}
          defaultValue='filter'
          className={style.filter}
        >
          <option value='all'>All</option>
          <option value='Ethereum'>Ethereum</option>
          <option value='Binance Smart Chain'>Binance Smart Chain</option>
          <option value='Avalanche'>Binance</option>
          <option value='Polygon'>Polygon</option>
        </select>
      </div>
      <table className={style.table_layout}>
        <thead>
          <tr
            style={{
              borderBottom: 'solid 1px white',
            }}
          >
            {columns.map((data) => {
              return <td style={{fontWeight: 'bold'}}>{data.Header}</td>
            })}
          </tr>
        </thead>
        <tbody>
          {filterData.map((data) => {
            return (
              <tr
                style={{
                  borderBottom: 'solid 1px #AAAAAA',
                }}
              >
                <td>{data.createdAt.split('T')[0]}</td>
                <td>{data.address}</td>
                <td>
                  <button
                    style={{
                      backgroundColor:
                        data.label === 'Auto' ? 'green' : '#0079fc',
                      borderRadius: '6px',
                      padding: '4px 6px',
                      border: 'none',
                    }}
                  >
                    {data.label}
                  </button>
                </td>
                <td>{data.note}</td>
                <td>{data.blockChainName}</td>
                <td
                  style={{paddingRight: '10px'}}
                  onClick={() => {
                    deleteAddress(data.uuid)
                  }}
                >
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal
        visible={modalVisible}
        footer={false}
        onCancel={closeModal}
        centered
        bodyStyle={{
          backgroundColor: '#050c1F',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            //backgroundColor: '#343D56',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            boxSizing: 'border-box',
            borderBottom: '2px solid #343D56',
          }}
        >
          <h4 style={{color: 'white'}}>Add New Address</h4>
          <CloseIcon />
        </div>

        <form
          style={{backgroundColor: '#050c1F'}}
          onSubmit={registerWhiteLabel}
        >
          <label className={style.label}>Enter Blockchain Address</label>
          <input
            id='address'
            name='Address'
            label='Enter Blockchain Address'
            placeholder='Blockchain Address'
            type='text'
            className={style.input}
            onChange={handleFormData}
          />

          {isEmpty ? (
            <p style={{color: 'red', textAlign: 'left'}}>
              This field is required
            </p>
          ) : null}

          <label className={style.label}>Select Blockchain</label>
          <select
            defaultValue={selectedBlockChain}
            className={style.input}
            name='Name'
            onChange={handleSelectForm}
          >
            {/* <option value='Ethereum'>Ethereum</option>
            <option value='Binance Smart Chain'>Smart Chain</option> */}
            {blockchainList &&
              blockchainList?.map((item) => {
                return (
                  <option key={item.chainID} value={item.chainID}>
                    {item.name}({item.shortName})
                  </option>
                )
              })}
          </select>

          <label className={style.label}>Note</label>
          <input
            id='note'
            name='Note'
            placeholder='Note'
            type='text'
            className={style.input}
            onChange={handleFormData}
          />

          {isNoteEmpty ? (
            <p style={{color: 'red', textAlign: 'left'}}>
              This field is required
            </p>
          ) : null}

          <button
            type='submit'
            className={style.submitButton}
            style={{backgroundColor: inProgress ? 'black' : '#0079fc'}}
            disabled={inProgress}
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default WhiteLabelAddress

function CloseIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='white'
      width='20px'
      height='20px'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  )
}
