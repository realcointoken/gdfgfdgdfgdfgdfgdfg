import React, {useState, useRef, useEffect} from 'react'
// import get from 'lodash/get'
import style from './PoolAbout.module.scss'
import cn from 'classnames'
import moment from 'moment'
// import ProgressDetail from '../../../components/ProgressDetail'
import {
  // getPoolInformation,
  getTokenInformation,
} from './utils'
// import imgPlaceholder from '../../../../../assets/img/placeholders/banner.png';
import {useSelector} from 'react-redux'
// import {Divider} from 'antd'

export default function ProjectAbout(props) {
  const {data, wrapperClass, loading} = props
  const projectState = useSelector((state) => state.project?.project.result)
  // const isUpcoming = moment(data.launchDate).diff(moment.now(), 'days') >= 0
  // const poolInfo = getPoolInformation(data)
  const tokenInfo = projectState ? getTokenInformation(projectState) : []
  // const walletAddress = useSelector((state) =>
  //   get(state, 'user.userAccount.accounts.0'),
  // )

  const [countdownData, setCountdownData] = useState(
    moment.duration(0, 'milliseconds'),
  )

  const intervalId = useRef(0)
  useEffect(() => {
    const interval = 1000
    const event = moment(data.launchDate).unix()
    const now = moment(new Date()).unix()
    let duration = moment.duration((event - now) * 1000, 'milliseconds')
    clearInterval(intervalId.current)

    if (data.launchDate && duration && duration.asMilliseconds() >= 0) {
      intervalId.current = setInterval(() => {
        duration = moment.duration(
          duration.asMilliseconds() - interval,
          'milliseconds',
        )
        setCountdownData(duration)
      }, interval)
    }

    return () => {
      clearInterval(intervalId.current)
    }
  }, [data.launchDate, data.createdAt])

  return (
    <section
      className={cn(style.container, wrapperClass, {
        [style.loading]: loading,
      })}
    >
      {(data.bannerUrl || loading) && (
        <img className={style.banner} src={data.bannerUrl} alt={'img'} />
      )}
      <div className={style.content}>
        {/* <div className={style.detailsHeader}>
          <div className={style.detailsHeaderItem}>
            <strong>{data.totalSupply}</strong>
            <br />
            <span className={style.dataLabel}>Local</span>
          </div>

          {data.tokenPrice && (
            <div className={style.detailsHeaderItem}>
              <strong>
                {(data.tokenPrice / 10 ** 18).toFixed(2)}{' '}
                {data.acceptedTokenSymbol}
              </strong>
              <br />
              <span className={style.dataLabel}>Per {data.symbol}</span>
            </div>
          )}

          <div className={style.detailsHeaderItem}>
            <strong>
              {data.minAllocation} {data.acceptedTokenSymbol}
            </strong>
            <br />
            <span className={style.dataLabel}>Min. Allocation</span>
          </div>
        </div>

        <ProgressDetail
          wrapperClass={style.progress}
          progress={data.totalSaleAmount}
          maxProgress={data.availableForPurchase}
        />

        <Divider />

        <div className={style.detailsHeader}>
          <div className={style.detailsHeaderItem}>
            <strong>0 {data.acceptedTokenSymbol}</strong>
            <br />
            <span className={style.dataLabel}>Your deposit</span>
          </div>

          <div className={style.detailsHeaderItem}>
            <strong>0</strong>
            <br />
            <span className={style.dataLabel}>Your share</span>
          </div>

          <div className={style.detailsHeaderItem}>
            <strong>
              {
                data.whitelists?.find(
                  (item) => item.walletAddress === walletAddress,
                )?.maxAllocation
              }{' '}
              {data.name}
            </strong>
            <br />
            <span className={style.dataLabel}>Your Allocation</span>
          </div>
        </div>

        <Divider /> */}

        {/* {data.description && (
          <>
            <h3 className={style.heading}>Project Overview</h3>
            <div className={style.text}>{data.description}</div>
            <div className={style.separator} />
          </>
        )} */}
        {/* <h3 className={style.heading}>Pool Detail</h3>
        {(isUpcoming || loading) && (
          <div className={style.sale}>
            <span className={style.dot} /> Live in{' '}
            {`${Math.floor(
              countdownData.asDays(),
            )}d:${countdownData.hours()}h:${countdownData.minutes()}m`}
          </div>
        )} */}
        <div className={style.grid}>
          {/* <div className={style.cell}>
            <h4 className={style.cellHeading}>Pool Information</h4>
            <ul className={style.dataList}>
              {(loading ? new Array(5).fill({}) : poolInfo).map((item, i) => (
                <li className={style.dataListItem} key={i}>
                  <div className={style.dataLabel}>{item.label}</div>
                  <div title={item.value} className={style.dataValue}>
                    {item.value}
                  </div>
                </li>
              ))}
            </ul>
          </div> */}
          <div className={style.cell}>
            <h4 className={style.cellHeading}>Description</h4>
            <p className={style.dataValue} style={{textAlign: 'left'}}>
              {projectState?.description || 'NA'}
            </p>
            <h4 className={style.cellHeading}>Token Information</h4>
            <ul className={style.dataList}>
              {(loading ? new Array(5).fill({}) : tokenInfo).map((item, i) => (
                <li className={style.dataListItem} key={i}>
                  <div className={style.dataLabel}>{item.label}</div>
                  <div title={item.value} className={style.dataValue}>
                    {item.value}
                    {item.button}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
