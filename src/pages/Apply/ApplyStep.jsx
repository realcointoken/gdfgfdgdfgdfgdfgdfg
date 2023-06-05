import React from 'react'

import {stepsData} from './stepData'
import timelineActive from './img/step-status/timeline-active.png'
import timelineDeactive from './img/step-status/timeline-deactive.png'
import StepOne from './Step1'
import StepTwo from './Step2'
import StepThree from './Step3'
import StepFour from './Step4'
import StepFive from './Step5'
import StepSix from './Step6'
import Success from './Succes'

import style from './Apply.module.scss'

const APPLY_STEPS = [StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix]

export function ApplyStep({data, step, onStepChange, onChange}) {
  const StepComponent = APPLY_STEPS[step]

  const renderStepItems = () => {
    return stepsData.map((e, i) => {
      return (
        <div key={i} className={style.stepItem}>
          <div className={style.itemText}>
            <h1>{e.title}</h1>
            <p>Step {i + 1}</p>
          </div>

          <div className={style.itemImg}>
            {step === i ? (
              <img src={e.iconActive} alt='icon' />
            ) : (
              <img src={e.iconDeactive} alt='icon' />
            )}
          </div>

          <div className={style.itemStatus}>
            {step === i ? (
              <img src={timelineActive} alt='icon' />
            ) : (
              <img src={timelineDeactive} alt='icon' />
            )}
          </div>
        </div>
      )
    })
  }

  const renderStep = () => {
    return (
      <StepComponent
        data={data}
        step={step}
        onContinue={onStepChange}
        onChange={onChange}
      />
    )
  }

  const renderStepHeader = () => {
    return stepsData.map((e, i) => {
      return (
        <div key={i} className={style.stepHeader}>
          {step === i && (
            <>
              <img className={style.iconMobile} src={e.iconActive} alt='icon' />
              <section>
                <strong className={style.titleMobile}>{e.title}</strong>
                <p className={style.stepMobile}>Step {i + 1}</p>
              </section>
            </>
          )}
        </div>
      )
    })
  }

  return (
    <div className={style.contentBox}>
      {step === 6 ? (
        <Success />
      ) : (
        <>
          <div className={style.left}>
            <div className={style.stepContainer}>{renderStepItems()}</div>
            <div className={style.status} />
            <div className={style.timeline} />
          </div>

          <div className={style.right}>
            {renderStepHeader()}
            {renderStep()}
          </div>
        </>
      )}
    </div>
  )
}
