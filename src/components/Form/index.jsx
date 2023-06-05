import React, {PureComponent} from 'react'
import classNames from 'classnames'
import Field from './components/Field'
import Button from '../Button'
import Error from './components/Error'
import {FORM_ERROR_REQUIRED, FORM_FIELD_TYPES} from './constants'
import cn from 'classnames'

import style from './Form.module.scss'
import FieldGroup from './components/FieldGroup'

export default class Form extends PureComponent {
  transformedChildren = null
  state = {
    data: {},
    errors: {},
  }
  errorGenerators = {}
  noNameFieldNumber = 0

  componentDidMount() {
    this.initData()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {errors} = this.props

    if (errors && prevProps.errors !== errors) {
      this.setState((state) => ({
        errors: {
          ...state.errors,
          ...errors,
        },
      }))
    }
  }

  initData() {
    const {children} = this.props
    let {initialData = {}, data: propsData, onChange} = this.props

    if (!this.transformedChildren) {
      this.transformedChildren = this.transformChildren(children)
    }

    initialData = {
      ...(propsData ? propsData : initialData),
      ...this.getDefaultValues(this.transformedChildren),
    }

    this.setState({
      data: initialData,
    })

    if (onChange) {
      onChange(initialData)
    }
  }

  getDefaultValues(children) {
    let data = {}

    // Map defaultValue prop of the Field component to the data object
    React.Children.forEach(children, (element) => {
      if (!element || !element.props) {
        return
      }

      const {defaultValue, name, children} = element.props

      if (children) {
        data = {...data, ...this.getDefaultValues(children)}
      }

      if (element.type === Field && defaultValue) {
        data[name] = defaultValue
      }
    })

    return data
  }

  resetValidation = () => {
    this.setState({
      errors: {},
    })
  }

  onFieldChange(field, value, onChangeCallback) {
    const {onChange, data: propsData, keepNull} = this.props
    const data = {...(propsData ? propsData : this.state.data)}
    const {errors} = this.state

    if (Object.keys(errors).length > 0) {
      this.resetValidation()
    }

    if (value || typeof value === 'boolean' || keepNull) {
      data[field] = value
    } else {
      delete data[field]
    }

    if (!propsData) {
      this.setState(
        {
          data,
        },
        () => {
          if (onChange && typeof onChange === 'function') {
            onChange(this.state.data)
          }
        },
      )
    } else {
      if (onChange && typeof onChange === 'function') {
        onChange(data)
      }
    }

    if (onChangeCallback && typeof onChangeCallback === 'function') {
      onChangeCallback(value)
    }
  }

  onFieldFocus(callback) {
    this.resetValidation()

    if (callback && typeof callback === 'function') {
      callback()
    }
  }

  validateFields() {
    const {data: propsData} = this.props
    const data = propsData ? propsData : this.state.data
    const errors = {}

    for (let name in this.errorGenerators) {
      if (this.errorGenerators.hasOwnProperty(name)) {
        const generator = this.errorGenerators[name]
        const error = generator(data[name], {...data})

        if (error) {
          errors[name] = error
        }
      }
    }

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  onFieldDestroy = (name, callback) => {
    const {data: propsData, onChange} = this.props
    const newData = propsData ? {...propsData} : {...this.state.data}

    delete newData[name]
    delete this.errorGenerators[name]

    if (propsData) {
      onChange(newData)
    } else {
      this.setState({
        data: newData,
      })
    }

    if (callback) {
      callback()
    }
  }

  submit(callback) {
    const {onSubmit, data: propsData} = this.props
    const data = propsData ? propsData : this.state.data

    const isValid = this.validateFields()

    if (isValid) {
      if (onSubmit) {
        onSubmit(data)
      }

      if (callback) {
        callback()
      }
    } else {
      setTimeout(() => this.scrollToError(), 300)
    }
  }

  scrollToError() {
    const error = document.querySelector('[class *= "Error"]')

    if (error) {
      error.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
  }

  transformChildren(children) {
    /*
            Recursively transforms every child component
            which is specific to the Form type
        */
    const {errors} = this.state
    const {requesting: formRequesting, data: propsData, fieldTypes} = this.props
    const formHasErrors = Object.keys(errors).length > 0
    const data = propsData ? propsData : this.state.data

    return React.Children.map(children, (element) => {
      let newElement = element

      if (!element) {
        return null
      }

      // Search children recursively
      if (element.props && React.Children.count(element.props.children)) {
        newElement = React.cloneElement(newElement, {
          children: this.transformChildren(newElement.props.children),
        })
      }

      switch (element.type) {
        case Field: {
          const {
            name = `field_${this.noNameFieldNumber++}`,
            generateError,
            wrapperClass,
            onChange,
            onFocus,
            beforeUnmount,
            overwriteChange,
            overwriteValue,
            error,
            value,
            ignore,
            required,
            type,
            cleanOnDestroy = false,
            ...restProps
          } = newElement.props

          if (ignore || !type) {
            return newElement
          }

          // Error generation for the validation func
          if (generateError) {
            this.errorGenerators[name] = generateError
          } else if (required) {
            this.errorGenerators[name] = (value) =>
              (!value || !value.length) && FORM_ERROR_REQUIRED
          }

          let onFieldChange = (value) =>
            this.onFieldChange(name, value, onChange)
          if (overwriteChange) {
            onFieldChange = (value) =>
              this.onFieldChange(name, overwriteChange(value), onChange)
          }

          let newValue = typeof value !== 'undefined' ? value : data[name]
          if (overwriteValue) {
            newValue = overwriteValue(newValue)
          }

          return React.cloneElement(newElement, {
            wrapperClass: cn(style.field, wrapperClass),
            name,
            beforeUnmount: cleanOnDestroy
              ? () => this.onFieldDestroy(name, beforeUnmount)
              : null,
            onMount: () => this.initData(),
            value: newValue,
            error: error || errors[name],
            onChange: onFieldChange,
            onFocus: () => this.onFieldFocus(onFocus),
            ...restProps,
          })
        }

        case Error: {
          const {name} = newElement.props

          if (name) {
            return React.cloneElement(newElement, {
              isVisible: errors[name],
              text: errors[name],
            })
          }

          return newElement
        }

        case FieldGroup: {
          const {wrapperClass, ...restProps} = newElement.props

          return React.cloneElement(newElement, {
            wrapperClass: cn(style.fieldGroup, wrapperClass),
            ...restProps,
          })
        }

        case Button: {
          const {type, onClick, disabled, loading} = newElement.props
          let onClickCallback = onClick

          if (type === FORM_FIELD_TYPES.SUBMIT) {
            onClickCallback = () => this.submit(onClick)
          }

          return React.cloneElement(newElement, {
            ...newElement.props,
            onClick: onClickCallback,
            disabled: disabled || formHasErrors,
            loading: loading || formRequesting,
          })
        }

        default: {
          // Check field types array
          if (fieldTypes && fieldTypes.indexOf(element.type) !== -1) {
            const {className} = newElement.props

            return React.cloneElement(newElement, {
              className: cn(style.fieldGroup, className),
              ...newElement.props,
            })
          }

          return newElement
        }
      }
    })
  }

  render() {
    const {wrapperClass, children, autocomplete} = this.props
    this.transformedChildren = this.transformChildren(children)

    return (
      <form
        className={classNames(style.container, wrapperClass)}
        onSubmit={(e) => e.preventDefault()}
        autoComplete={autocomplete}
      >
        {this.transformedChildren}
      </form>
    )
  }
}
