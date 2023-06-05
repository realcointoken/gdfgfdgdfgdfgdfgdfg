import React from 'react'
import {get} from 'lodash'
import Form from '../../../components/Form'
import Button from '../../../components/Button'
import {FORM_FIELD_TYPES} from '../../../components/Form/constants'
import {blockchainData} from '../../Apply/stepData'
import {smartContracts} from '../../Apply/stepData'
import cn from 'classnames'

import style from '../Apply.module.scss'
import Field from '../../../components/Form/components/Field'

export default function StepThree({data, step, onContinue, onChange}) {
  const {
    developmentState,
    developmentRoadmap,
    uniqueValueProposition,
    cardanoContribution,
    financingStructure,
  } = data
  const disabled =
    !developmentState ||
    !developmentRoadmap ||
    !uniqueValueProposition ||
    !cardanoContribution ||
    !financingStructure
  return (
    <section className={style.header}>
      <h1 className={style.title}>Step {step + 1}/6</h1>
      <p className={style.heading}>Project Details</p>
      <p className={style.description}>Enter the Project Deatils</p>
      <Form
        data={data}
        wrapperClass={style.form}
        onChange={(newData) => {
          onChange({
            ...data,
            developmentState: get(newData, 'developmentState', ''),
            developmentRoadmap: get(newData, 'developmentRoadmap', ''),
            uniqueValueProposition: get(newData, 'uniqueValueProposition', ''),
            cardanoContribution: get(newData, 'cardanoContribution', ''),
            financingStructure: get(newData, 'financingStructure', ''),
          })
        }}
      >
        <Field
          id={'developmentState'}
          name={'developmentState'}
          placeHolder={'Development State'}
          label={'Enter Project Development State *'}
          type={FORM_FIELD_TYPES.AREA}
          defaultValue={data && developmentState}
          required
        />
        <Field
          id={'developmentRoadmap'}
          name={'developmentRoadmap'}
          placeHolder={'Development Roadmap'}
          label={'Enter Project Development Roadmap *'}
          type={FORM_FIELD_TYPES.AREA}
          defaultValue={data && developmentRoadmap}
          required
        />
        <Field
          id={'uniqueValueProposition'}
          name={'uniqueValueProposition'}
          placeHolder={'Unique Value Proposition'}
          label={'Enter Project Unique Value Proposition *'}
          type={FORM_FIELD_TYPES.AREA}
          defaultValue={data && uniqueValueProposition}
          required
        />
        <Field
          id={'cardanoContribution'}
          name={'cardanoContribution'}
          placeHolder={'Cardano Contribution'}
          label={'Enter Project Cardano Contribution *'}
          type={FORM_FIELD_TYPES.AREA}
          defaultValue={data && cardanoContribution}
          required
        />
        <Field
          id={'financingStructure'}
          name={'financingStructure'}
          placeHolder={'Product Financing Structure'}
          label={'Enter Project Financing Structure *'}
          type={FORM_FIELD_TYPES.AREA}
          defaultValue={data && financingStructure}
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
    </section>
  )
}
