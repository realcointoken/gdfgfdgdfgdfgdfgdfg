import React, {useEffect} from 'react'
import style from './Loader.module.scss'
import lottie from 'lottie-web'
import loadingJson from './loading.svg'
import loadingd from './loading.json'
import cn from 'classnames'

export default function Loader(props) {
  const {isVisible} = props
  const id = 'loading-container'

  useEffect(() => {
    let animation = lottie.loadAnimation({
      container: document.getElementById(id),
      animationData: loadingd,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      name: 'animation',
    })

    setTimeout(() => {
      animation.play()
    }, 350)

    return () => {
      lottie.destroy('animation')
    }
  }, [])

  return (
    <div
      className={cn(style.container, {
        [style.containerVisible]: isVisible,
      })}
    >
      <div className={style.bgMask} />
      <div className={style.bg}>
        {/* <div id={loadingJson} className={style.loader} /> */}

        <img
          src={loadingJson}
          id={loadingd}
          className={style.loader}
          alt='loader'
        />
      </div>
    </div>
  )
}
