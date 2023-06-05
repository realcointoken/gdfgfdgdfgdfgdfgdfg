import React from 'react'
import cn from 'classnames'
import style from './About.module.scss'

import x1 from './img/1.png'
import introX2 from './img/intro.png'
import eth from './img/eth.png'
import bnb from './img/bnb.png'
import polkadot from './img/polkadot.png'
import solana from './img/solana.png'
import cross from './img/cross.png'
import kyc from './img/kyc.png'
import staking from './img/staking.png'
// import twitter from './img/twitter.png';

import Button from '../../components/Button'
import Bubbles from '../../components/Bubbles'
import TextGradient from '../../components/TextGradient'
import Cta from '../../components/Cta'

import {investersImg} from './mockData'

export default function About(props) {
  const renderSectionOne = () => {
    return (
      <section className={style.section1}>
        <Cta
          primary
          wrapperClass={style.cta}
          title={
            <>
              <TextGradient text={'About LavaX'} />
            </>
          }
          text={
            'Learn more about our mission to create a decentralized and fair\n ' +
            'blockchain-agnostic launchpad.'
          }
        >
          <Button
            text={'APPLY FOR IDO'}
            primary
            blue
            wrapperClass={style.btnWordGap}
            onClick={() => props.history.push('/apply')}
          />
          {/* <Button
            wrapperClass={`${style.buttonRight} ${style.btnWordGap}`}
            text={'BUY ON PANCAKE SWAP'}
            primary
            dark
            iconAlignStart
            onClick={() =>
              window.open(
                'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xc43570263e924c8cf721f4b9c72eed1aec4eb7df',
                '_blank',
              )
            }
          /> */}
          {/* <img className={style.x} src={x1} alt={''} /> */}
        </Cta>
      </section>
    )
  }

  const renderSectionTwo = () => {
    return (
      <section className={style.section2}>
        <img className={style.intro} src={introX2} alt={''} />
      </section>
    )
  }

  const renderSectionThree = () => {
    return (
      <section className={style.section3}>
        <div className={style.blockchainItem}>
          <img className={style.blockchainImg} src={eth} alt={''} />
        </div>

        <div className={style.blockchainItem}>
          <img className={style.blockchainImg} src={bnb} alt={''} />
        </div>

        <div className={style.blockchainItem}>
          <img className={style.blockchainImg} src={polkadot} alt={''} />
        </div>

        <div className={style.blockchainItem}>
          <img className={style.blockchainImg} src={solana} alt={''} />
        </div>
      </section>
    )
  }

  const renderSectionFour = () => {
    return (
      <section className={style.section4}>
        <strong className={style.heading}>
          Launching and Staking Ecosystem <br /> for Cross-Chain Connectivity
        </strong>
        <p className={style.detail}>
          Join the list of projects choosing the launch and raise capital on our{' '}
          <br /> decentralized blockchain-agnostic ecosystem.
        </p>

        <div className={style.listContainer}>
          <section className={style.listChoosing}>
            <img className={style.listImg} src={cross} alt={''} />
            <section className={style.listInfo}>
              <strong className={style.listHeading}>
                Cross-Chain Launches
              </strong>
              <p className={style.listDetail}>
                Launch your token on one or several different blockchains at
                once.
              </p>
            </section>
          </section>

          <section className={style.listChoosing}>
            <img className={style.listImg} src={kyc} alt={''} />
            <section className={style.listInfo}>
              <strong className={style.listHeading}>
                KYC and Transparency
              </strong>
              <p className={style.listDetail}>
                Our built-in KYC/AML tools enable launches to be safe and
                transparent.
              </p>
            </section>
          </section>

          <section className={style.listChoosing}>
            <img className={style.imgCustom} src={staking} alt={''} />
            <section className={style.listInfo}>
              <strong className={style.listHeading}>
                Powerful Staking Features
              </strong>
              <p className={style.listDetail}>
                LAUNCH holders can stake and earn project coins in the staking
                pools.
              </p>
            </section>
          </section>
        </div>
      </section>
    )
  }

  const renderSectionFive = () => {
    return (
      <section className={style.section5}>
        <strong className={style.heading}>Quarterly 2021 Roadmap</strong>
        <p className={style.detail}>
          See our plan for expanding and advancing the LauncX platform
        </p>

        <div className={style.quarterlyContainer}>
          <section className={style.quarterlyItem}>
            <strong className={style.quarterlyHeading}>
              Binance Smart Chain
            </strong>
            <p className={style.quarterlyDetail}>
              Listing and launches for these chains
            </p>
            <strong className={style.textAbsolute}>Q2</strong>
          </section>

          <section className={style.quarterlyItem}>
            <strong className={style.quarterlyHeading}>
              Polkadot & Solana
            </strong>
            <p className={style.quarterlyDetail}>
              Added support for these chains
            </p>
            <strong className={style.textAbsolute}>Q3</strong>
          </section>

          <section className={style.quarterlyItem}>
            <strong className={style.quarterlyHeading}>
              Cross Chain Launches
            </strong>
            <p className={style.quarterlyDetail}>
              Support for multi-chain IDOs
            </p>
            <strong className={style.textAbsolute}>Q4</strong>
          </section>
        </div>
      </section>
    )
  }

  // const renderSectionSix = () => {
  //   return (
  //     <section className={style.section6}>
  //       <strong className={style.heading}>Advisors & Team</strong>
  //       <p className={style.detail}>
  //         Our founding team members and advisory board span across the globe, bringing <br />
  //         together diverse backgrounds and blockchain experience into a focused mission <br />
  //         of developing the most advanced launchpad in the space.
  //       </p>
  //
  //       <div className={style.listTeamContainer}>
  //         {
  //           advisorTeam.map((e, i) => {
  //             return (
  //               <section key={i} className={style.listTeamItem}>
  //                 <div className={style.avartarContainer}>
  //                   <img className={style.avartarImg} src={e.avartar} alt={'avartar'} />
  //                 </div>
  //                 <strong className={style.name}>{e.name}</strong>
  //                 <p className={style.position}>{e.position}</p>
  //                 <img className={style.twitter} src={twitter} alt={''} />
  //               </section>
  //             );
  //           })
  //         }
  //       </div>
  //     </section>
  //   );
  // };

  const renderSectionSeven = () => {
    return (
      <>
        {/* <section className={style.section7}>
        <strong className={style.heading}>Partners</strong>
        <p className={style.detail}>
          First-class partners backing the LavaX platform.
        </p>

        <div className={style.investersContainer}>
          {investersImg.map((e, i) => {
            return (
              <section key={i} className={style.investersItem}>
                <img className={style.investerImg} src={e.src} alt={''} />
              </section>
            )
          })}
        </div>
      </section> */}
      </>
    )
  }

  return (
    <div className={cn(style.container, 'content')}>
      <Bubbles />
      {renderSectionOne()}
      {renderSectionTwo()}
      {renderSectionThree()}
      {renderSectionFour()}
      {renderSectionFive()}
      {/*{renderSectionSix()}*/}
      {renderSectionSeven()}
    </div>
  )
}
