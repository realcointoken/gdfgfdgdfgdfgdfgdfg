import React, {useState, useEffect} from 'react'
import style from './staking.module.scss'
import {Row, Col, ProgressBar, Table, Button} from 'react-bootstrap'
import RightAngleIcon from './assets/rightangle.png'
import AlertIcon from './assets/purchase.svg'
import Logo from './assets/Logo.svg'
import TelegramIcon from './assets/telegram.png'
import TwitterIcon from './assets/twitter.png'
import DotIcon from './assets/dot.svg'
import DotRedIcon from './assets/dotred.svg'
import ClockIcon from './assets/clock.svg'
import HandsUp from './assets/handsup.svg'
import Congrates from './assets/congrates.svg'

import Purchaselimit from '../../components/SideBoxes/Purchaselimit'
import PurchaseModal from './modals/PurchaseModal'
import TransactionConfirm from './modals/TransactionConfirm'

import UnstakeConfirm from './modals/Unstakeconfirm'
import TokensaleComingsoon from '../../components/SideBoxes/TokensaleComingsoon'
import IDOOver from '../../components/SideBoxes/IDOOver'
import SwitchToBinancechain from '../../components/SideBoxes/SwitchToBinancechain'
import LoseAllocation from '../../components/SideBoxes/LoseAllocation'
import WonAllocation from '../../components/SideBoxes/WonAllocation'
import WhitelistedSuccess from '../../components/SideBoxes/WhitelistedSuccess'
import PurchaseToken from '../../components/SideBoxes/PurchaseToken'
import moment from 'moment'
import axios from 'axios'
import NoImage from './assets/noimage.svg'
import {useParams, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getAllInvestmentByProjectId} from '../../store/actions/getAllInvestmentbyProjectId'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {current} from '../../store/actions/current'
import {claim, stackAmount, switchMetamask} from '../../store/actions/user'

const PoolDetail = () => {
  const {id} = useParams()
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const [purchaseModal, setPurchaseModal] = useState(false)
  const [transactionConfirm, setTransactionConfirm] = useState(false)
  const [unstakeConfirm, setUnstakeConfirm] = useState(false)
  const [data, setData] = useState()
  const [showMore, setShowMore] = useState(false)
  const [isWrongChainId, setIsWrongChainId] = useState(false)
  const [wrongChainId, setWrongChainId] = useState(false)
  const [endDate, setEndDate] = useState('')
  const [liveDate, setLiveDate] = useState('')
  const [isWhiteListed, setIsWhiteListed] = useState(false)

  const [getAllConfirmedInvestment, setGetAllConfirmedInvestment] = useState([])
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const [purchaseModalPayload, setPurchaseModalPayload] = useState({})
  const [purchaseModalShowData, setPurchaseModalShowData] = useState({})
  const userState = useSelector((state) => state.user)
  const loginState = useSelector((state) => state.login)
  const [opensDate, setOpensDate] = useState()
  const investDetailData = useSelector(
    (state) => state.getAllInvestmentbyProjectId.response,
  )

  const chainId = window.ethereum.chainId
  const history = useHistory()
  const dispatch = useDispatch()

  const closeUnstakeConfirmModal = () => {
    setUnstakeConfirm(false)
  }
  const closeTransactionConfirmModal = () => {
    setTransactionConfirm(false)
  }
  const closePurchaseModal = () => {
    setPurchaseModal(false)
  }
  useEffect(() => {
    axios
      .get(httpUrl + `/api/v1/Pool/GetPoolById?ProjectId=${id}`)
      .then(async (response) => {
        setData(response.data.data)
        setTimeout(async () => {
          var chain = await window.ethereum.chainId

          if (
            parseInt(response.data?.data?.blockChainChainId) !== parseInt(chain)
          ) {
            setIsWrongChainId(true)
          } else {
            setIsWrongChainId(false)
          }
        }, 300)

        const purchasePayload = {
          chainId: parseInt(response.data?.data?.blockChainChainId),
          ContractAddress: response.data?.data?.contractAddress,
          ProjectId: id,
        }

        const PurchaseModalShowData = {
          image: response.data?.data?.image,
          blockChainName: response.data?.data?.blockChainName,
          fullName: response.data?.data?.fullName,
          remainingSupplyAmount: response.data?.data?.remainingSupplyAmount,
          blockChainChainId: response.data?.data?.blockChainChainId,
          tokenRate: response.data?.data?.tokenRate,
          endDate: response.data?.data?.endDate,
          poolStatus: response.data?.data?.poolStatus,
          tokenName: response.data?.data?.tokenName,
          tokenSymbol: response.data?.data?.tokenSymbol,
          contractAddress: response.data?.data?.contractAddress,
          stableContractAdress: response.data?.data?.stableContractAdress,
          stackingContractAddress: response.data?.data?.stackingContractAddress,
          idoContractAddress: response.data?.data?.idoContractAddress,
          maximumInvestment: response.data?.data?.maximumInvestment,
          minimumInvestment: response.data?.data?.minimumInvestment,
        }

        console.log('purchasePayload', purchasePayload)

        setPurchaseModalPayload(purchasePayload)
        setPurchaseModalShowData(PurchaseModalShowData)
        setOpensDate('Start')
      })
      .catch((error) => {
        console.log('this is error')
        console.log(error)
      })

    setTimeout(() => {
      dispatch(getAllInvestmentByProjectId(id))
      axios
        .get(`${httpUrl}/api/v1/Pool/GetAllConfirmedInvestment`)
        .then((res) => {
          console.log(res)
          setGetAllConfirmedInvestment(res?.data?.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, 2000)
  }, [])

  useEffect(() => {
    setWrongChainId(isWrongChainId)
  }, [isWrongChainId])

  useEffect(() => {
    setTimeout(() => {
      dispatch(current())
        .then((res) => {
          console.log('current Api Success', res?.data)
          setIsWhiteListed(true)
        })
        .catch((error) => {
          console.log('current API Failed')
        })
    }, 2000)
  }, [])

  useEffect(() => {
    var now = moment().format()

    setTimeout(() => {
      if (
        (data?.claimDate && now <= moment(data?.claimDate).format()) ||
        (data?.claimDate === '0001-01-01T00:00:00' &&
          now < moment(data?.endDate).format())
      ) {
        if (now < moment(data?.liveDate).format()) {
          // live Date
          var LiveDateThen = moment(data?.liveDate).format()

          var livems = moment(LiveDateThen).diff(moment(now))
          var dated = moment.duration(livems)

          console.log(opensDate)

          setOpensDate(
            (prev) =>
              `Opens In ${dated._data.days} Days ${dated._data.hours} Hours ${dated._data.minutes} Minutes ${dated._data.seconds} seconds`,
          )
        } else if (now < moment(data?.endDate).format()) {
          //End Launch Date
          var endDateThen = moment(data?.endDate).format()
          var endDatems = moment(endDateThen).diff(moment(now))
          var dated = moment.duration(endDatems)

          setOpensDate(
            (prev) =>
              `Close In ${dated._data.days} Days ${dated._data.hours} Hours ${dated._data.minutes} Minutes ${dated._data.seconds} seconds `,
          )
        }

        //Clain Date
      } else {
        setOpensDate((prev) => `This Project is Closed`)
      }
    }, 1000)
  }, [opensDate])

  useEffect(() => {
    if (data && data?.endDate) {
      const d = new Date(data?.endDate)
      const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
      const mo = new Intl.DateTimeFormat('en', {month: 'numeric'}).format(d)
      const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)
      const endDate = `${ye}-${mo}-${da}`
      setEndDate(endDate)
    }

    if (data && data?.liveDate) {
      const liveDate = new Date(data?.liveDate)
      const liveYear = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(
        liveDate,
      )
      const liveMonth = new Intl.DateTimeFormat('en', {
        month: 'numeric',
      }).format(liveDate)
      const liveDay = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(
        liveDate,
      )
      const liveProjectDate = `${liveYear}-${liveMonth}-${liveDay}`
      setLiveDate(liveProjectDate)
    }
  }, [data?.endDate, data?.liveDate])

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('homeProductId')
    }, 2000)
  }, [])

  const withdrawModal = () => {
    claim(purchaseModalShowData?.idoContractAddress)
      .then((transactionHash) => {
        console.log('claimmmmmmmmmmmmmmm')
        axios
          .post(httpUrl + `/api/v1/Pool/TokenTransaction`, {
            walletAddress: userState.userAccount.accounts[0],
            projectId: parseInt(id),
            blockCHainId: parseInt(window.ethereum.chainId),
          })
          .then((response) => {
            console.log('this is response withdraw')
            console.log(response)
            setTimeout(() => {
              dispatch(getAllInvestmentByProjectId(id))
            }, 1000)
          })
          .catch((error) => {
            console.log('this is error')
            console.log(error)
          })
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  const showMoreAndLessButton = () => {
    setShowMore(!showMore)
  }

  return (
    <div
      style={{
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingTop: '30px',
      }}
    >
      <Row>
        <Col md={8}>
          {/* <div style={{display: 'flex', alignItems: 'center'}}>
            <p style={{margin: '0px', padding: '0px', color: '#FFFFFF44'}}>
              Values
            </p>
            <img src={RightAngleIcon} alt='icon' style={{margin: '0px 6px'}} />
            <p style={{margin: '0px', padding: '0px'}}>{data?.projectName}</p>
          </div> */}
          <div style={{display: 'flex', marginTop: '38px'}}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#181F30',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '24px',
              }}
            >
              <img
                //src={data?.imageFile}
                src={data?.image ? `${httpUrl}/${data?.image}` : NoImage}
                alt='Logo'
                width='42px'
                height='42px'
              />
            </div>

            <div>
              <p className={style.proj_title}>{data?.projectName}</p>
              <a
                href={data?.websiteURL}
                className={`${style.textDecorationNone} ${style.link}`}
                target='_blank'
              >
                {data?.websiteURL}
              </a>
            </div>
          </div>
          <div
            className={style.leftside}
            style={{height: 'calc(100% - 172px)'}}
          >
            <div
              className={style.logo_div}
              style={{
                backgroundImage: `url(${httpUrl}/${data?.backgroundImageFile?.replaceAll(
                  '\\',
                  '/',
                )})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <img
                //src={data?.imageFile}
                src={
                  data?.backgroundImageFile
                    ? `${httpUrl}/${data?.image}`
                    : NoImage
                }
                alt='Logo'
                width='138px'
                height='138px'
                // style={{width: '100%', height: '100%'}}
              />
            </div>
            <div className={style.values_div}>
              <p className={style.project_overview}>Project Links</p>
              <Row>
                <Col sm={4}>
                  {data?.projectTelegram && (
                    <div
                      style={{
                        display: 'flex',

                        borderRadius: '15px',
                        padding: '3px 10px',
                        marginRight: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <a
                        href={data?.projectTelegram}
                        className={style.textDecorationNone}
                        target='_blank'
                      >
                        <img
                          src={TelegramIcon}
                          alt='icon'
                          style={{marginRight: '7px'}}
                        />
                        <span className={style.button_text}>Telegram</span>
                      </a>
                    </div>
                  )}
                </Col>
                <Col sm={4}>
                  {data?.projectTwitter && (
                    <div
                      style={{
                        display: 'flex',

                        borderRadius: '15px',
                        padding: '3px 10px',
                        cursor: 'pointer',
                      }}
                    >
                      <a
                        href={data?.projectTwitter}
                        className={style.textDecorationNone}
                        target='_blank'
                      >
                        <img
                          src={TwitterIcon}
                          alt='icon'
                          style={{marginRight: '7px'}}
                        />
                        <span className={style.button_text}>Twitter</span>
                      </a>
                    </div>
                  )}
                </Col>
              </Row>

              <div
                style={{
                  height: '1px',
                  backgroundColor: '#3A435A',
                  marginTop: '24px',
                  marginBottom: '27px',
                }}
              />

              <div>
                <p>{opensDate}</p>
              </div>
              <div>
                <ProgressBar
                  now={
                    100 -
                    (data?.remainingSupplyAmount / data?.supplyAmount) * 100
                  }
                  style={{borderRadius: '30px'}}
                />
                <p
                  style={{textAlign: 'right', margin: '0px'}}
                  className={style.progress_value}
                >
                  {100 -
                    (data?.remainingSupplyAmount / data?.supplyAmount) *
                      100}{' '}
                  %
                </p>
              </div>

              {showMore ? (
                <>
                  <div>
                    <p className={style.project_overview}>
                      About {data?.shortDescription}
                    </p>

                    <p className={style.project_overview_detail}>
                      {data?.projectDescription}
                    </p>
                  </div>

                  <div>
                    <p className={style.project_overview}>Pool Detail</p>

                    <p className={style.pooldetail}>
                      <img
                        src={DotIcon}
                        alt='doticon'
                        style={{marginRight: '8px', marginBottom: '3px'}}
                      />
                      Live in {liveDate}
                    </p>
                  </div>
                  <Row>
                    <Col lg={6}>
                      <div style={{marginRight: '10px'}}>
                        <p className={style.poolinformation}>
                          Pool Information
                        </p>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p className={style.colname}>Project Live Date</p>
                          <p className={style.colvalue}>
                            {moment(data?.liveDate).format('YYYY-MM-DD')}
                          </p>
                        </div>
                        <div
                          style={{
                            height: '1px',
                            backgroundColor: '#3A435A',
                            marginBottom: '8px',
                          }}
                        />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p className={style.colname}>End Date</p>
                          <p className={style.colvalue}>{endDate}</p>
                        </div>
                        {data?.claimDate !== '0001-01-01T00:00:00' && (
                          <>
                            <div
                              style={{
                                height: '1px',
                                backgroundColor: '#3A435A',
                                marginBottom: '8px',
                              }}
                            />
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <p className={style.colname}>Claim Date</p>
                              <p className={style.colvalue}>
                                {moment(data?.claimDate).format('YYYY-MM-DD')}
                              </p>
                            </div>
                          </>
                        )}
                        <div
                          style={{
                            height: '1px',
                            backgroundColor: '#3A435A',
                            marginBottom: '8px',
                          }}
                        />

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p className={style.colname}>Blockchain</p>
                          <p className={style.colvalue}>
                            {data?.blockChainName}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div>
                        <p className={style.poolinformation}>
                          Token Information
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p className={style.colname}>Name</p>
                          <p className={style.colvalue}>{data?.tokenName}</p>
                        </div>

                        <div
                          style={{
                            height: '1px',
                            backgroundColor: '#3A435A',
                            marginBottom: '8px',
                          }}
                        />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p className={style.colname}>Symbol</p>
                          <p className={style.colvalue}>{data?.tokenSymbol}</p>
                        </div>
                        <div
                          style={{
                            height: '1px',
                            backgroundColor: '#3A435A',
                            marginBottom: '8px',
                          }}
                        />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p className={style.colname}>Contact Address</p>
                          <p className={style.colvalue}>
                            {data?.contractAddress}
                          </p>
                        </div>
                        <div
                          style={{
                            height: '1px',
                            backgroundColor: '#3A435A',
                            marginBottom: '8px',
                          }}
                        />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p className={style.colname}>Initial Supply</p>

                          <p className={style.colvalue}>{data?.supplyAmount}</p>
                        </div>
                        <div
                          style={{
                            height: '1px',
                            backgroundColor: '#3A435A',
                            marginBottom: '8px',
                          }}
                        />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p className={style.colname}>Total Supply</p>
                          <p className={style.colvalue}>{data?.supplyAmount}</p>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className='mt-2'>
                        <p className={style.poolinformation}>Investment</p>
                        <Table
                          borderless
                          variant='dark'
                          className={`text-center ${style.customTableBackground}`}
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Amount</th>
                              <th>Created At</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {investDetailData &&
                              investDetailData.data !== null &&
                              investDetailData.map((value, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{value.amount}</td>
                                    <td>
                                      {moment(value.createdAt).format(
                                        'MM-DD-YYYY',
                                      )}
                                    </td>
                                    <td>{value.tokenAllocationStatus}</td>
                                    {/* <Button
                                        variant='primary'
                                        onClick={() => withdrawModal()}
                                      >
                                        Claim
                                      </Button> */}
                                    {/* {value.isClaimable &&
                                      !value.alreadyClamed &&
                                      value.tokenAllocationStatus == 'Confirmed' */}
                                    {/* ? // <Button */}
                                    {/* //   variant='primary'
                                          //   onClick={() => withdrawModal()}
                                          // >
                                          //   Claim
                                          // </Button>
                                          'Token Allocated'
                                        : 'Waiting for allocation'}
                                    </td> */}
                                  </tr>
                                )
                              })}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </>
              ) : (
                ''
              )}
              <div className='text-center'>
                <button
                  className={style.btnPurchase}
                  onClick={() => showMoreAndLessButton()}
                >
                  {showMore ? 'Show Less' : 'Show More'}
                </button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className={`d-flex flex-column`}>
          <div style={{marginTop: window.innerWidth < 768 ? 0 : 150}} />
          {wrongChainId ? (
            <div className='mb-2'>
              <SwitchToBinancechain
                chainId={data?.blockChainChainId}
                chainName={data?.blockChainName}
              />
            </div>
          ) : (
            ''
          )}

          {data?.poolStatus === 'ComingSoon' ? (
            <div className='mb-2'>
              <div
                style={{
                  padding: '25px 50px',
                  textAlign: 'center',
                  background: '#000000',
                  borderRadius: '16px',
                  border: '1px solid #ffffff',
                }}
              >
                <img
                  src={ClockIcon}
                  alt='alert'
                  width='138.68px'
                  height='76.35px'
                />
                <p>Token Sale Coming Soon</p>
              </div>
            </div>
          ) : (
            <>
              {(!isWrongChainId &&
                investDetailData&&investDetailData?.length == 0 &&
                data?.poolStatus === 'Live') ||
              (investDetailData&&investDetailData[0] &&
                investDetailData[0]?.tokenAllocationStatus === 'InProcessing' &&
                data?.poolStatus === 'Live') ? (
                <>
                  {!purchaseModal ? (
                    <div className='mb-2'>
                      <div
                        style={{
                          padding: '25px 50px',
                          textAlign: 'center',
                          background: '#000000',
                          borderRadius: '16px',
                          border: '1px solid #ffffff',
                        }}
                      >
                        {/* <img
                          src={AlertIcon}
                          alt='alert'
                          width='138.68px'
                          height='76.35px'
                        /> */}
                        {isWhiteListed ? (
                          <p>
                            Your address has been whitelisted, So you can invest
                            in this project
                          </p>
                        ) : (
                          <p>
                            Your address is not whitelisted, So you cannot
                            invest in this project
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                ''
              )}
              {!isWrongChainId &&
              investDetailData.length > 0 &&
              investDetailData?.some(
                (item) => item.isClaimable && !item.alreadyClamed,
              ) ? (
                <>
                  <div className='mb-2'>
                    {/* <PurchaseToken /> */}
                    <div
                      style={{
                        padding: '25px 50px',
                        textAlign: 'center',
                        background: '#000000',
                        borderRadius: '16px',
                        border: '1px solid #ffffff',
                      }}
                    >
                      {/* <img
                        src={AlertIcon}
                        alt='alert'
                        width='138.68px'
                        height='76.35px'
                      /> */}
                      {/* <p>
                        Ypu can claim.
                      </p> */}
                      <button
                        className={style.btnPurchase}
                        onClick={() => {
                          withdrawModal()
                        }}
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
            </>
          )}

          {!isWrongChainId &&
          investDetailData[0]?.tokenTransactionStatus == 'Pending' ? (
            <>
              <div className='mb-2'>
                <div
                  style={{
                    padding: '25px 50px',
                    textAlign: 'center',
                    background: '#000000',
                    borderRadius: '16px',
                    border: '1px solid #ffffff',
                  }}
                >
                  {/* <img
                    src={AlertIcon}
                    alt='alert'
                    width='138.68px'
                    height='76.35px'
                  /> */}
                  <p>
                    You Transaction is Pending it will be added to your wallet
                    as soon as it will be approved
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}

          {!isWrongChainId &&
          investDetailData[0]?.tokenTransactionStatus == 'Confirmed' ? (
            <>
              <div className='mb-2'>
                <div
                  style={{
                    padding: '25px 50px',
                    textAlign: 'center',
                    background: '#000000',
                    borderRadius: '16px',
                    border: '1px solid #ffffff',
                  }}
                >
                  {/* <img
                    src={AlertIcon}
                    alt='alert'
                    width='138.68px'
                    height='76.35px'
                  /> */}
                  <p>
                    Congratulation! your Transaction has be Confirmned Please
                    check your wallet
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}

          {!isWrongChainId &&
          investDetailData&&investDetailData[0]?.tokenTransactionStatus == 'Cancelled' ? (
            <>
              <div className='mb-2'>
                <div
                  style={{
                    padding: '25px 50px',
                    textAlign: 'center',
                    background: '#000000',
                    borderRadius: '16px',
                    border: '1px solid #ffffff',
                  }}
                >
                  {/* <img
                    src={AlertIcon}
                    alt='alert'
                    width='138.68px'
                    height='76.35px'
                  /> */}
                  <p>Your Transaction is cancelled</p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}

          {investDetailData.length > 0 &&
          investDetailData?.some((item) => item.alreadyClamed) ? (
            <>
              <div className='mb-2'>
                <div
                  style={{
                    padding: '25px 50px',
                    textAlign: 'center',
                    background: '#000000',
                    borderRadius: '16px',
                    border: '1px solid #ffffff',
                  }}
                >
                  <p>You already claimed your rewards.</p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}

          <PurchaseModal
            open={purchaseModal}
            close={closePurchaseModal}
            data={purchaseModalPayload}
            purchaseModalShowData={purchaseModalShowData}
          />
        </Col>
      </Row>

      <TransactionConfirm
        open={transactionConfirm}
        close={closeTransactionConfirmModal}
      />
      <UnstakeConfirm open={unstakeConfirm} close={closeUnstakeConfirmModal} />
    </div>
  )
}

export default PoolDetail
