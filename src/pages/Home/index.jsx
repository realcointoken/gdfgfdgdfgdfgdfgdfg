import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'

import cn from 'classnames'
import {get} from 'lodash'
import {Row} from 'antd'
import {Col, Container, Button} from 'react-bootstrap'

import notify from './img/notify.png'
import x2 from './img/2.png'

// import Button from '../../components/Button'
import WelcomeModal from '../../components/WelcomeModal'
import Cta from '../../components/Cta'
import TextGradient from '../../components/TextGradient'
import Pools from '../../Containers/Pools'
import Bubbles from '../../components/Bubbles'
import {fetchAllProjects} from '../../store/actions/project'
import {PAGE_ALL_PROJECTS_PATH} from '../../router/constants'
import HomeRightImage from './img/home-right-image.png'
import partner from '../../assets/img/partner.png'

import style from './Home.module.scss'
import {getQueryParam} from '../../utils'
import StackPools from '../../components/StackPools'
import PoolItem from '../../Containers/Pools/PoolItem'
import {FaTwitter, FaTelegram} from 'react-icons/fa'
import {message} from 'antd'
import axios from 'axios'
import moment from 'moment'
import Parser from 'html-react-parser'

export default function Home(props) {
  const dispatch = useDispatch()
  const [upComingPools, setUpComingPools] = useState([])
  const [livePools, setLivePools] = useState([])
  const [completedPools, setCompletedPools] = useState([])
  const [width, setWidth] = React.useState(window.innerWidth)
  const [poolData, setPoolData] = useState([])
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const loginState = useSelector((state) => state.login)
  const isRequesting = useSelector(
    (state) => state.project.allProjects.requesting,
  )
  const history = useHistory()

  useEffect(() => {
    setTimeout(() => {
      document.body.style.backgroundColor = 'white'
    }, 1000)
    document.body.style.backgroundColor = 'white'
    return () => {
      document.body.style.backgroundColor = '#172540'
    }
  }, [])

  useEffect(() => {
    dispatch(fetchAllProjects()).then(({payload}) => {
      const upComingPools = payload?.data?.upComingPools
      const livePools = payload?.data?.livePools
      const completedPools = payload?.data?.completedPools
      const blockchain = getQueryParam('blockchain')

      if (blockchain === 'ethereum' || blockchain === 'bsc') {
        const newUpComingPools = upComingPools.filter(
          (e) => e.blockchain === blockchain,
        )
        const newLivePools = livePools.filter(
          (e) => e.blockchain === blockchain,
        )
        const newCompletedPools = completedPools.filter(
          (e) => e.blockchain === blockchain,
        )

        setUpComingPools(newUpComingPools)
        setLivePools(newLivePools)
        setCompletedPools(newCompletedPools)
      } else {
        setUpComingPools(upComingPools)
        setLivePools(livePools)
        setCompletedPools(completedPools)
      }
    })
  }, [dispatch])

  const redirect = (id) => {
    // history.push(`/pooldetail/1`)

    if (window.ethereum) {
      if (
        Object.keys(loginState?.authResponse).length == 0 &&
        loginState?.authResponse?.data?.token == undefined
      ) {
        localStorage.setItem('homeProductId', JSON.stringify(id))
        history.push('/login')
      } else {
        localStorage.removeItem('homeProductId')

        history.push(`/pooldetail/${id}`)
      }
    } else {
      const thisIsMyCopy = message.error(
        Parser(`<span>Please install and setup MetaMask Extension 
        <a style="color:#0867C6;text-decoration:none" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" 
        target="_blank"> From This Link <a> to use Application.</span>`),
      )
    }
  }

  useState(() => {
    setTimeout(() => {
      axios
        .get(httpUrl + '/api/v1/Pool/GetAllPools')
        .then((response) => {
          console.log('this  is pools data')

          const rows = response.data.data
          rows.sort(function (a, b) {
            return b.id - a.id
          })
          setPoolData(rows)
        })
        .catch((error) => {
          console.log('this  is error data')
          console.log(error)
        })
    }, 2000)
  }, [poolData.length === 0])

  const upComingPoolsStore = useSelector((state) =>
    get(state.project.allProjects, 'upComingPools', []),
  )
  const livePoolsStore = useSelector((state) =>
    get(state.project.allProjects, 'livePools', []),
  )
  const completedPoolsStore = useSelector((state) =>
    get(state.project.allProjects, 'completedPools', []),
  )

  const handleSortBlockchainType = (item) => {
    if (item === 'ethereum' || item === 'bsc') {
      const newUpComingPools = upComingPoolsStore.filter((e) =>
        item ? e.IDOContractNetwork === item : true,
      )
      const newLivePools = livePoolsStore.filter((e) =>
        item ? e.IDOContractNetwork === item : true,
      )
      const newCompletedPools = completedPoolsStore.filter((e) =>
        item ? e.IDOContractNetwork === item : true,
      )

      setUpComingPools(newUpComingPools)
      setLivePools(newLivePools)
      setCompletedPools(newCompletedPools)
    } else {
      setUpComingPools(upComingPoolsStore)
      setLivePools(livePoolsStore)
      setCompletedPools(completedPoolsStore)
    }
  }

  return (
    // <div className={cn(style.container, 'content')} style={{marginTop: '20px'}}>
    //   <Bubbles />
    //   <Row type='flex' align='top' className={style.section1}>
    //     <Col span={24}>
    //       <Cta
    //         wrapperClass={style.topHeadingText}
    //         title={
    //           <>
    //             Multi-Chain Decentralized IDO
    //             <br />
    //             <TextGradient text={'Launchpad'} /> Platform
    //           </>
    //         }
    //         text={
    //           window.innerWidth > 767
    //             ? 'LavaX is driving the next generation of projects to launch in a fair\n ' +
    //               'and decentralized manner across multiple chains.'
    //             : 'LavaX is driving the next generation of projects to launch in a fair and decentralized manner across multiple chains.'
    //         }
    //       >
    //         <Button
    //           text={'VIEW ALL PROJECTS'}
    //           primary
    //           blue
    //           onClick={() => history.push(PAGE_ALL_PROJECTS_PATH)}
    //         />

    //         <a
    //           href={'#'}
    //           target={'_blank'}
    //           rel='noreferrer'
    //         >
    //           <Button
    //             wrapperClass={style.buttonRight}
    //             text={'GET NOTIFIED'}
    //             primary
    //             dark
    //             icon={notify}
    //             iconAlignStart
    //           />
    //         </a>
    //         {/* <img className={style.x} src={x1} alt={''} /> */}
    //       </Cta>
    //     </Col>
    //   </Row>

    //   {/* <section className={cn(style.section2)}>
    //     <Pools
    //       upComingPools={upComingPools}
    //       livePools={livePools}
    //       completedPools={completedPools}
    //       isRequesting={isRequesting}
    //       onChange={handleSortBlockchainType}
    //     />
    //   </section> */}
    //   {/* <PoolItem /> */}

    //   <section style={{margin: '40px 0px'}}>
    //     <StackPools />
    //   </section>
    //   {/* <PoolItem /> */}

    //   <section className={style.section3}>
    //     <Cta
    //       wrapperClass={style.cta}
    //       style={{wordSpacing: 10}}
    //       title={
    //         window.innerWidth > 767 ? (
    //           <>
    //             <TextGradient text={'Quality'} /> Projects
    //             <span className={style.dot}>.</span>
    //             <TextGradient text={'Big'} /> Launches
    //             {/* <span className={style.dot}>.</span> */}
    //           </>
    //         ) : (
    //           <>
    //             <TextGradient text={'Quality'} /> Projects
    //             <span className={style.dot}>.</span> <br />
    //             <TextGradient text={'Big'} /> Launches
    //             {/* <span className={style.dot}>.</span> */}
    //           </>
    //         )
    //       }
    //       text={'Submit Your Project’s IDO Application Today'}
    //     >
    //       <Link to={'/apply'}>
    //         <Button text={'APPLY NOW'} primary blue />
    //       </Link>
    //       <Link to={'/about'}>
    //         <Button
    //           wrapperClass={style.buttonRight}
    //           text={'READ MORE'}
    //           primary
    //           dark
    //         />
    //       </Link>
    //       {/* <img className={style.x} src={x2} alt={''} /> */}
    //     </Cta>
    //   </section>
    // </div>
    <>
    <Container>
      <Row
        style={{backgroundColor: '#ffffff'}}
        className='align-items-center justify-content-sm-center'
      >
        <Col sm={12} md={6} lg={6}>
          <Row className='align-items-center justify-content-sm-center'>
            <Col sm={8}>
              <h1 className={`${style.textDark} ${style.fontWeight700} `}>
                IDO Launchpad for the Multi-Chain Ecosystem
              </h1>
              <p
                className={`text-primary ${style.fontWeight700} ${style.fontSize20}`}
              >
                Built for the Community. Supported by Venture Capital.
              </p>
              <p className='text-primary'>Join the community</p>
            </Col>
          </Row>
          <Row className='align-items-center justify-content-sm-center'>
            <Col sm={8} md={12} lg={12}>
              <div className='d-flex' style={{gap: 10}}>
                <Button variant='primary' size='lg'>
                  <a
                    href='https://twitter.com/Lavax_labs '
                    className={style.textDecorationNone}
                    target='_blank'
                  >
                    Twitter <FaTwitter />
                  </a>
                </Button>
                <Button variant='primary' size='lg'>
                  <a
                    href='https://t.me/weLavaXLabs'
                    className={style.textDecorationNone}
                    target='_blank'
                  >
                    Telegram <FaTelegram />
                  </a>
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={6}>
          <img src={HomeRightImage} className={style.imageFullResulation} />
        </Col>
      </Row>
    </Container>
    <Container className='mt-1'>
      <Row>
        <h2 className={`text-primary mb-5 ${style.fontWeight700}`}>Pools</h2>
        {poolData.map((data) => {
          return (
            data.adminStatus === 'Verified' && (
              <Col sm={12} className='mb-4'>
                <div className={style.poolCardBorder}>
                  <div style={{textAlign: 'right'}}>
                    <span
                      className='text-light p-1'
                      style={{backgroundColor: '#999999'}}
                    >
                      {data?.poolStatus}
                    </span>
                  </div>
                  <Row className='justify-content-center align-items-center justify-content-sm-between'>
                    <Col sm={2} md={2} lg={2}>
                      <img
                        src={`${httpUrl}/${data?.image}`}
                        className={style.poolImage}
                      />
                    </Col>
                    <Col sm={6} md={7} lg={8}>
                      <div>
                        <h1 className={'text-dark'}>{data?.fullName}</h1>
                      </div>
                      <div>
                        <p className='text-secondary'>
                          {data?.projectDescription}
                        </p>
                      </div>
                    </Col>
                    <Col sm={2} md={2} lg={2}>
                      <Button
                        className={`${style.goToProjectBtn}`}
                        onClick={() => redirect(data.id)}
                      >
                        {' '}
                        Go to Project
                      </Button>
                    </Col>
                  </Row>
                  <div style={{textAlign: 'right'}}>
                    <span className='text-dark' style={{marginRight: 20}}>
                      IDO Date
                    </span>
                    <span className='text-dark'>
                      Date: {moment(data?.startDate).format('MM-DD-YYYY')}
                    </span>
                  </div>
                </div>
              </Col>
            )
          )
        })}
      </Row>
    </Container>
    <Container className='mt-5 mb-5'>
      <Row>
        <Col>
          <div className={style.parthnerCardBorder}>
            <img src={partner} style={{width: '100%', height: '100%'}} />
          </div>
        </Col>
      </Row>
    </Container>
  </>
  )
}
