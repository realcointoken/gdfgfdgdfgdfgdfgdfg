import React from 'react'
import {get} from 'lodash'
import style from '../Apply.module.scss'

import Form from '../../../components/Form'
import Field from '../../../components/Form/components/Field'
import Button from '../../../components/Button'
import {FORM_FIELD_TYPES} from '../../../components/Form/constants'

export default function StepTwo({data, step, onContinue, onChange}) {
  const {projectName, tokenInformation, projectDescription} = data
  const disabled = !projectName || !tokenInformation || !projectDescription

  return (
    <section className={style.header}>
      <h1 className={style.title}>Step {step + 1}/6</h1>
      <p className={style.heading}>Project Information</p>
      <p className={style.description}>
        Enter the full name of your upcoming project.
      </p>

      <>
        <Form
          data={data}
          wrapperClass={style.form}
          onChange={(newData) => {
            onChange({
              ...data,
              projectName: get(newData, 'projectName', ''),
              websiteURL: get(newData, 'websiteURL', ''),
              whitepaperURL: get(newData, 'whitepaperURL', ''),
              linkToDeck: get(newData, 'linkToDeck', ''),
              projectTwitter: get(newData, 'projectTwitter', ''),
              tokenInformation: get(newData, 'tokenInformation', ''),
              projectDescription: get(newData, 'projectDescription', ''),
              projectTelegram: get(newData, 'projectTelegram', ''),
              projectGithub: get(newData, 'projectGithub', ''),
            })
          }}
        >
          <Field
            id={'projectName'}
            name={'projectName'}
            label={'Enter Your Project name *'}
            placeholder={'Project name'}
            type={FORM_FIELD_TYPES.TEXT}
            required
            defaultValue={data && data.projectName}
          />

          <Field
            id={'websiteURL'}
            name={'websiteURL'}
            label={'Enter Website URL'}
            placeholder={'Website URL'}
            type={FORM_FIELD_TYPES.TEXT}
            defaultValue={data && data.websiteURL}
          />
          <Field
            id={'whitepaperURL'}
            name={'whitepaperURL'}
            label={'Enter Whitepaper URL'}
            placeholder={'Whitepaper URL'}
            type={FORM_FIELD_TYPES.TEXT}
            defaultValue={data && data.whitepaperURL}
          />
          <Field
            id={'linkToDeck'}
            name={'linkToDeck'}
            label={'Enter Link to Deck'}
            placeholder={'Link to Deck'}
            type={FORM_FIELD_TYPES.TEXT}
            defaultValue={data && data.linkToDeck}
          />
          <Field
            id={'projectTwitter'}
            name={'projectTwitter'}
            label={'Enter Project Twitter'}
            placeholder={'Project Twitter'}
            type={FORM_FIELD_TYPES.TEXT}
            defaultValue={data && data.projectTwitter}
          />
          <Field
            id={'projectTelegram'}
            name={'projectTelegram'}
            label={'Enter Project Telegram'}
            placeholder={'Project Telegram'}
            type={FORM_FIELD_TYPES.TEXT}
            defaultValue={data && data.projectTelegram}
          />
          <Field
            id={'projectGithub'}
            name={'projectGithub'}
            label={'Enter Project Github'}
            placeholder={'Project Github'}
            type={FORM_FIELD_TYPES.TEXT}
            defaultValue={data && data.projectGithub}
          />
          <Field
            id={'projectDescription'}
            name={'projectDescription'}
            label={'Enter Project Description *'}
            placeholder={'Project Description'}
            type={FORM_FIELD_TYPES.AREA}
            defaultValue={data && data.projectDescription}
            required
          />
          <Field
            id={'tokenInformation'}
            name={'tokenInformation'}
            label={'Enter Token Information *'}
            placeholder={'Token Information'}
            type={FORM_FIELD_TYPES.AREA}
            defaultValue={data && data.tokenInformation}
            required
          />

          <div className={style.btnContainer}>
            <Button
              wrapperClass={style.backBtn}
              text={'BACK'}
              primary
              dark
              onClick={() => onContinue(step - 1)}
            />
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
