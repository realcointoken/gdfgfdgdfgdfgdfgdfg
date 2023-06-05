// import {useEffect, useState} from 'react'
// import {useDispatch} from 'react-redux'
// import {fetchTotalTVL} from '../../../store/actions/project'
import cn from 'classnames'
import style from './ProjectCard.module.scss'
import {getSocialList} from './utls'
// import PseudoInput from '../../../components/Form/components/PseudoInput'

export default function ProjectCard(props) {
  const {data = {}, wrapperClass, loading} = props
  const socialLinks = getSocialList(data)
  // const dispatch = useDispatch()
  // const [totalTVL, setTotalTVL] = useState('0')

  // useEffect(() => {
  //   dispatch(fetchTotalTVL()).then((res) => {
  //     const data = res?.payload?.result ?? '0'
  //     setTotalTVL(data)
  //   })
  // }, [dispatch])
  return (
    <div
      className={cn(style.container, wrapperClass, {[style.loading]: loading})}
    >
      <div
        style={{backgroundImage: `url(${data.logoUrl})`}}
        className={style.image}
      />

      <div className={style.info}>
        <h2 className={style.name}>
          {data.name}
          <span className={style.symbol}>({data.symbol})</span>
        </h2>
        <div
          style={{backgroundImage: `url(${data.logoUrl})`}}
          className={style.imageSmall}
        />
        {(data.shortDescription || loading) && (
          <p className={style.text}>{data.shortDescription}</p>
        )}
        <a
          className={style.websiteLink}
          href={data.websiteLink}
          target={'_blank'}
          rel={'noreferrer'}
        >
          {data.websiteLink}
        </a>
        {socialLinks && (
          <ul className={style.socialLinks}>
            {socialLinks.map((item, i) => (
              <li className={style.linkWrapper} key={i}>
                <a
                  href={item.href}
                  target={'_blank'}
                  rel={'noreferrer'}
                  className={style.link}
                >
                  <img src={item.icon} alt='' className={style.linkIcon} />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* <PseudoInput light wrapperClass={style.tvlContainer}>
        <span>TVL:</span>
        <span>$ {totalTVL}</span>
      </PseudoInput> */}
    </div>
  )
}
