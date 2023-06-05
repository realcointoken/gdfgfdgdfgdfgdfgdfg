import React from 'react'
import style from './LinGroup.module.scss'
import {Link} from 'react-router-dom'
import {FaExternalLinkAlt} from 'react-icons/fa'
import cn from 'classnames'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretRight} from '@fortawesome/free-solid-svg-icons'

export default function LinkGroup(props) {
  const {items, title, wrapperClass} = props

  return (
    <div className={cn(style.container, wrapperClass)}>
      {title && <h4 className={style.heading}>{title}</h4>}
      <ul className={style.links}>
        {items &&
          items.map((item, i) => (
            <li className={style.linksItem} key={i}>
              {item.href ? (
                <>
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    style={{color: '#ffffff'}}
                  />{' '}
                  <a
                    className={style.link}
                    href={item.href}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {item.text}
                  </a>{' '}
                  <FaExternalLinkAlt style={{color: '#ffffff'}} />
                </>
              ) : (
                <Link className={style.link} to={item.link}>
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    style={{color: '#ffffff'}}
                  />
                  &nbsp;
                  {item.image && (
                    <img
                      className={style.linkImage}
                      src={item.image}
                      alt='img'
                    />
                  )}
                  {item.text}&nbsp;{' '}
                  <FaExternalLinkAlt style={{color: '#ffffff'}} />
                </Link>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}
