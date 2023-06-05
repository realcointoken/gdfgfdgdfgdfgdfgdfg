import React, {useState} from 'react'
import {get} from 'lodash'
import style from '../Apply.module.scss'

import Form from '../../../components/Form'
import Field from '../../../components/Form/components/Field'
import Button from '../../../components/Button'
import {FORM_FIELD_TYPES} from '../../../components/Form/constants'
import {validateEmail} from '../../../utils'

export default function StepOne({data, step, onContinue, onChange}) {
  const {fullName, yourEmail, title} = data
  const disabled = !fullName || !title || !validateEmail(yourEmail)
  const [fullNameInput, setFullNameInput] = useState(fullName)
  const [titleInput, setTitleInput] = useState(title)

  const fullNameAlphabet = (event) => {
    var regex = /^[a-zA-Z ]{0,100}$/
    if (regex.test(event)) {
      setFullNameInput(event)
    }
  }

  const titleAlphabet = (event) => {
    var regex = /^[a-zA-Z ]{0,100}$/
    if (regex.test(event)) {
      setTitleInput(event)
    }
  }

  return (
    <section className={style.header}>
      <h1 className={style.title}>Step {step + 1}/6</h1>
      <p className={style.heading}>Enter Personal Information</p>
      <p className={style.description}>
        We need to learn a little more about you before we can proceed.
      </p>

      <>
        <Form
          data={data}
          wrapperClass={style.form}
          onChange={(newData) => {
            onChange({
              ...data,
              fullName: get(newData, 'fullName', ''),
              title: get(newData, 'title', ''),
              yourTelegram: get(newData, 'yourTelegram', ''),
              yourEmail: get(newData, 'yourEmail', ''),
            })
          }}
        >
          <Field
            id={'fullName'}
            name={'fullName'}
            label={'Enter Your Full Name *'}
            placeholder={'Full Name'}
            onChange={(e) => fullNameAlphabet(e)}
            value={fullNameInput}
            type={FORM_FIELD_TYPES.TEXT}
            required
          />
          <Field
            id={'title'}
            name={'title'}
            label={'Enter Title *'}
            placeholder={'Title'}
            onChange={(e) => titleAlphabet(e)}
            value={titleInput}
            type={FORM_FIELD_TYPES.TEXT}
            required
          />

          <Field
            id={'yourTelegram'}
            name={'yourTelegram'}
            label={'Enter Your Telegram'}
            placeholder={'e.g. @avock'}
            type={FORM_FIELD_TYPES.TEXT}
          />

          <Field
            id={'yourEmail'}
            name={'yourEmail'}
            label={'Enter Your Email Address *'}
            placeholder={'e.g. name@example.com'}
            type={FORM_FIELD_TYPES.TEXT}
            required
          />

          <div className={style.btnContainer}>
            <Button
              wrapperClass={style.nextBtn}
              type={FORM_FIELD_TYPES.SUBMIT}
              text={'CONTINUE'}
              primary
              blue
              onClick={() => onContinue(step + 1)}
              disabled={disabled}
            />
          </div>
        </Form>
      </>
    </section>
  )
}
