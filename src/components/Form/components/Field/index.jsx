import React, {PureComponent} from 'react'
import classNames from 'classnames'
import Error from '../Error'
import Input from '../Input'

import style from './Field.module.scss'

export default class Field extends PureComponent {
  componentWillUnmount() {
    const {beforeUnmount} = this.props

    if (beforeUnmount) {
      // Need for the Form component functionality
      beforeUnmount()
    }
  }

  render() {
    const {
      wrapperClass,
      label,
      labelContent,
      error,
      id,
      hint,
      children,
      type,
      disabled,
      isAddress,
    } = this.props

    return (
      <div className={classNames('field', style.container, wrapperClass)}>
        {label && (
          <span className={style.labelWrapper}>
            <label
              htmlFor={id}
              className={style.label}
              // style={{position: 'relative', left: isAddress ? '-17px' : '0px'}}
            >
              {label}
            </label>
            {labelContent}
          </span>
        )}
        {type && <Input {...this.props} wrapperClass={style.input} />}
        {children}
        <Error
          // address={isAddress ? true : false}
          isVisible={!!error}
          text={error}
          wrapperClass='formError'
        />
        {hint && <div className={style.hint}>{hint}</div>}
      </div>
    )
  }
}
