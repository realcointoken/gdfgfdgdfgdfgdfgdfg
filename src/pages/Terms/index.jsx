import React from 'react'
import cn from 'classnames'
import style from './Terms.module.scss'

import x1 from './img/1.png'
import Cta from '../../components/Cta'
import TextGradient from '../../components/TextGradient'
import Bubbles from '../../components/Bubbles'

export default function Terms(props) {
  return (
    <div className={cn(style.container, 'content')}>
      <Bubbles />
      <section className={style.section1}>
        <Cta
          primary
          wrapperClass={style.cta}
          title={
            <>
              Terms of <TextGradient text={'Service.'} />
            </>
          }
        >
          {/* <img className={style.x} src={x1} alt={''} /> */}
        </Cta>
      </section>

      <p className={style.textNormal}>
        This end user agreement (the "Agreement") should be read by you (the
        "User" or "you") in its entirety prior to your use of LavaX's service
        or products. Be aware that this Agreement constitutes a legally binding
        agreement between you and Lava X (referred to herein as "LavaX", "us"
        or "we") which owns and operates the website on the Internet and the
        Service at https://LavaX.org (the "Service"). You consent to adhering
        to all the terms set forth in this Agreement when/if you are provided
        with an “I Agree” button and clicking on it.
      </p>

      <section className={style.section2}>
        <div className={style.separately}>
          <h2 className={style.textBold}>1. Grant of License</h2>
          <ul className={style.list}>
            <li>
              1.1. LavaX grants the User a non-exclusive, personal,
              non-transferable right to use the Service on your personal
              computer or other device that accesses the Internet in order to
              access and use the services available and described on the
              https://www.lavax.org/ website (the website and all its
              functionality together being the "Service"), subject to the terms
              and conditions contained herein.
            </li>

            <li>
              1.2. The Service is not for use by (i) minors and individuals
              under the age of 18 years, (ii) individuals who can be considered
              minors or under the age of majority adulthood in their specific
              jurisdiction(s) (iii) individuals accessing or using the Service
              from any jurisdiction in which it is illegal to do so. Lava X does
              not have the ability to verify the legality of the Service in
              every jurisdiction, therefore it is entirely up to the User to
              determine whether or not their use of the Service is lawful.
            </li>

            <li>
              1.3. LavaX and its licensors are the sole holders of all rights
              in and to the Service and code, technology, organization and
              structure, architecture, including copyright, trade secrets,
              intellectual property and other rights. You may not: (a) copy,
              create derivative works, distribute, publish, reverse engineer,
              decompile, disassemble, modify, or translate the LavaX website or
              the Service; or (b) use the Service that in any way is prohibited
              by applicable laws or regulations (each of the above herein
              defined as an "Unauthorized Use").
            </li>

            <li>
              1.4 LavaX reserves any and all rights implied or otherwise, which
              are not expressly granted to the User hereunder and retain all
              rights, title and interest in and to the Service. You agree that
              you will be solely liable for any damage, costs or expenses
              arising out of or in connection with the commission by you of any
              Unauthorized Use. You shall notify LavaX immediately upon
              becoming aware of the commission by any person of any Unauthorized
              Use and shall provide LavaX with reasonable assistance with any
              investigations it conducts in light of the information provided by
              you in this respect.
            </li>

            <li>
              1.5. The term "LavaX", its domain names and any other trade
              marks, or service marks used by LavaX as part of the Service (the
              "Trade Marks"), are solely owned by LavaX. In addition, all
              content on the website, including, but not limited to, the images,
              pictures, graphics, photographs, animations, videos, music, audio
              and text (the "Site Content") belongs to Lava X and is protected
              by copyright and/or other intellectual property or other rights.
              You hereby acknowledge that by using the Service, you obtain no
              rights in the Site Content and/or the Trade Marks, or any part
              thereof. Under no circumstances may you use the Site Content
              and/or the Trade Marks without LavaX's prior written consent.
              Additionally, you agree not to do anything that will harm or
              potentially harm the rights, including the intellectual property
              rights of LavaX.
            </li>
          </ul>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>2. No Warranties</h2>
          <ul className={style.list}>
            <li>
              2.1. LavaX disclaims any and all warranties, expressed or
              implied, in connection with the service which is provided to you
              "as is" and we provide you with no warranty or representation
              whatsoever regarding its quality, fitness for purpose,
              completeness or accuracy.
            </li>

            <li>
              2.2. Regardless of LavaX's efforts, LavaX makes no warranty that
              the service will be uninterrupted, timely or error-free, or that
              defects will be corrected.
            </li>
          </ul>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>3. Authority/Terms of Service</h2>
          <p className={style.textPadding}>
            You agree to the rules of the Service provided and described on the
            lavax.org website. LavaX retains all authority over the issuing,
            maintenance, and closing of the Service. The decision of LavaX's
            management, concerning any use of the Service, or dispute
            resolution, is final and shall not be open to review or appeal.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>
            4. Your Representations and Warranties
          </h2>
          <p className={style.textPadding}>
            Prior to your use of the Service and on an ongoing basis you
            represent, warrant, covenant and agree that:
          </p>
          <br />
          <ul className={style.list}>
            <li>
              4.1. there is a risk of losing cryptocurrency & other funds of
              value when using the Service and Lava X has no responsibility to
              you for any such loss;
            </li>

            <li>
              4.2. your use of the Service is at your sole option, discretion
              and risk;
            </li>

            <li>
              4.3. you are solely responsible for any applicable taxes which may
              be payable on cryptocurrency traded or transacted by you through
              your using the Service;
            </li>

            <li>
              4.5. the telecommunications networks, blockchain networks (such as
              Polkadot and Ethereum) and Internet access services required for
              you to access and use the Service are entirely beyond the control
              of LavaX and LavaX shall have no liability whatsoever for any
              outages, slowness, capacity constraints or other deficiencies
              affecting the same; and
            </li>

            <li>
              4.6. you are (i) aged 18 or over, (ii) you are of the age of
              majority in your jurisdiction, (iii) you are accessing the Service
              from a jurisdiction in which it is legal to do so, (iv) you are
              not a Politically Exposed Person (PEP) nor are you on any U.S. or
              EU Sanctions lists or terrorism finance watchlists, and (v) that
              you will inform Lava X immediately if you enter onto one of these
              lists or change your residence to a prohibited jurisdiction.
            </li>

            <li>
              4.7 You warrant that should you discover a bug or error that may
              lead to an exploit of the Service or other loss of funds from Lava
              X, you have the responsibility to notify LavaX at
              Support@lavax.org in a timely manner. Furthermore, any attempt by
              you to use such a discovered exploit or bug for illicit financial
              gain is illegal and strictly prohibited under this Agreement.
              LavaX reserves the right to prosecute to the fullest extent of
              the law anyone who exploits or attempts to exploit the Service in
              an unlawful manner. Such exploits or bugs should be disclosed in a
              responsible manner and in strict confidence with
              support@lavax.org and no other entity.
            </li>
          </ul>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>5. Prohibited Uses</h2>
          <ul className={style.list}>
            <li>
              5.1. PERSONAL USE. The Service is intended solely for the User’s
              personal use. The User is only allowed to use the Service for
              personal use, and may not create multiple accounts, including for
              the purpose of collusion and/or abuse of service.
            </li>

            <li>
              5.2 EXPLOITS & BUGS. The Service is provided as is, and any
              exploitation of the Service or errors in program logic and/or code
              (bugs) constitutes a Prohibited Use and a material breach of this
              Agreement. Any funds the user may misappropriate in this manner
              pursuant to this clause shall be considered void and the immediate
              property of LavaX, without limit.
            </li>

            <li>
              5.3 JURISDICTIONS. Persons located in or residents of the United
              States, North Korea, Iran, Venezuela or any other jurisdiction in
              which it is prohibited from using the Service (the ”Prohibited
              Jurisdictions”) are not permitted to make use of the Service. For
              the avoidance of doubt, the foregoing restrictions on Service from
              Prohibited Jurisdictions applies equally to residents and citizens
              of other nations while located in a Prohibited Jurisdiction. Any
              attempt to circumvent the restrictions on usage by any persons
              located in a Prohibited Jurisdiction or Restricted Jurisdiction,
              is a breach of this Agreement. An attempt at circumvention
              includes, but is not limited to, manipulating the information used
              by LavaX to identify your location and providing LavaX with
              false or misleading information regarding your location or place
              of residence. Any and all monies (including cryptocurrencies) of a
              person located in a Prohibited Jurisdiction on the Service are
              VOID, and can be confiscated or may be returned to the person at
              LavaX's sole discretion.
            </li>
          </ul>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>
            6. Know your Customer (“KYC”) and Anti-Money Laundering (AML) Policy
          </h2>
          <p className={style.textNormal}>
            LavaX is a permissionless and fully decentralised platform for
            token sales, swaps, and decentralized exchange. As a software
            development company, LavaX has no role in enforcing KYC by default,
            however we do provide such tools for fundraising entities using
            LavaX to enforce on their users, if the entities choose to do so.
            The use of KYC/AML tools on LavaX by fundraising entities using the
            Service is completely at the discretion of said entities.
          </p>
          <br />
          <p className={style.textNormal}>
            Therefore, and at the sole behest of fundraising entities and/or
            competent reguMontserratry authorities:
          </p>
          <br />
          <p className={style.textNormal}>
            LavaX reserves the right, at any time, to ask for any KYC
            documentation it deems necessary to determine the identity and
            location of a User. LavaX reserves the right to restrict service
            and payment until identity is sufficiently determined.
          </p>
          <br />
          <p className={style.textNormal}>
            LavaX reserves the right, at any time, to ask for any KYC
            documentation it deems necessary to determine the identity and
            location of a User. LavaX reserves the right to restrict service
            and payment until identity is sufficiently determined.
          </p>
          <br />
          <p className={style.textNormal}>
            LavaX reserves the right to confiscate any and all funds that are
            found to be in violation of relevant and applicable anti-money
            laundering (AML) and countering terrorism financing (CFT) laws and
            regulations, and to cooperate with the competent authorities when
            and if necessary.
          </p>
          <br />
          <p className={style.textNormal}>AML & SANCTIONS COMPLIANCE. </p>
          <br />
          <p className={style.textNormal}>
            LavaX expressly prohibits and rejects the use of the Service for
            any form of illicit activity, including money laundering, terrorist
            financing or trade sanctions violations, consistent with various
            jurisdictions’ laws, regulations and norms. To that end, the Service
            is not offered to individuals or entities on any Politically Exposed
            Persons (PEP) lists, or subject to any United States, European
            Union, or other global sanctions or watch lists. By using the
            Service, end users represent and warrant that they are not on any
            such lists.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>7. Breach</h2>
          <ul className={style.list}>
            <li>
              7.1. Without prejudice to any other rights, if a User breaches in
              whole or in part any provision contained herein, LavaX reserves
              the right to take such action as it sees fit, including
              terminating this Agreement or any other agreement in place with
              the User and/or taking legal action against such User.
            </li>

            <li>
              7.2. You agree to fully indemnify, defend and hold harmless LavaX
              and its shareholders, directors, agents and employees from and
              against all claims, demands, liabilities, damages, losses, costs
              and expenses, including legal fees and any other charges
              whatsoever, howsoever caused, that may arise as a result of: (i)
              your breach of this Agreement, in whole or in part; (ii) violation
              by you of any law or any third party rights; and (iii) use by you
              of the Service.
            </li>
          </ul>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>8. Limitations and Liability</h2>
          <ul className={style.list}>
            <li>
              8.1. Under no circumstances, including negligence, shall LavaX be
              liable for any special, incidental, direct, indirect or
              consequential damages whatsoever (including, without limitation,
              damages for loss of business profits, business interruption, loss
              of business information, or any other pecuniary loss) arising out
              of the use (or misuse) of the Service even if LavaX had prior
              knowledge of the possibility of such damages.
            </li>

            <li>
              8.2. Nothing in this Agreement shall exclude or limit LavaX's
              liability for death or personal injury resulting from its
              negligence.
            </li>
          </ul>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>9. Disputes</h2>
          <p className={style.textPadding}>
            If a User wishes to make a complaint, please contact LavaX's
            customer service team at Support@lavax.org. Should any dispute not
            be resolved to your satisfaction you may pursue remedies in the
            governing law jurisdiction set forth below.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>10. Amendment</h2>
          <p className={style.textPadding}>
            LavaX reserves the right to update or modify this Agreement or any
            part thereof at any time or otherwise change the Service without
            notice and you will be bound by such amended Agreement upon posting.
            Therefore, we encourage you to check the terms and conditions
            contained in the version of the Agreement in force at such time.
            Your continued use of the Service shall be deemed to attest to your
            agreement to any amendments to the Agreement.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>11. Governing Law</h2>
          <p className={style.textPadding}>
            The Agreement and any matters relating hereto shall be governed by,
            and construed in accordance with, the laws of the British Virgin
            Islands. You irrevocably agree that, subject as provided below, the
            courts of the British Virgin Islands shall have exclusive
            jurisdiction in relation to any claim, dispute or difference
            concerning the Agreement and any matter arising therefrom and
            irrevocably waive any right that it may have to object to an action
            being brought in those courts, or to claim that the action has been
            brought in an inconvenient forum, or that those courts do not have
            jurisdiction. Nothing in this clause shall limit the right of LavaX
            to take proceedings against you in any other court of competent
            jurisdiction, nor shall the taking of proceedings in any one or more
            jurisdictions preclude the taking of proceedings in any other
            jurisdictions, whether concurrently or not, to the extent permitted
            by the law of such other jurisdiction.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>12. Severability</h2>
          <p className={style.textPadding}>
            If a provision of this Agreement is or becomes illegal, invalid or
            unenforceable in any jurisdiction, that shall not affect the
            validity or enforceability in that jurisdiction of any other
            provision hereof or the validity or enforceability in other
            jurisdictions of that or any other provision hereof.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>13. Assignment</h2>
          <p className={style.textPadding}>
            LavaX reserves the right to assign this agreement, in whole or in
            part, at any time without notice. The User may not assign any of
            his/her rights or obligations under this Agreement.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>14. Miscellaneous</h2>
          <ul className={style.list}>
            <li>
              14.1. No waiver by LavaX of any breach of any provision of this
              Agreement (including the failure of LauncX to require strict and
              literal performance of or compliance with any provision of this
              Agreement) shall in any way be construed as a waiver of any
              subsequent breach of such provision or of any breach of any other
              provision of this Agreement.
            </li>

            <li>
              14.2. Nothing in this Agreement shall create or confer any rights
              or other benefits in favour of any third parties not party to this
              Agreement.
            </li>

            <li>
              14.3. Nothing in this Agreement shall create or be deemed to
              create a partnership, agency, trust arrangement, fiduciary
              relationship or joint venture between you and LavaX.
            </li>

            <li>
              14.4. LavaX may assign, transfer, charge, sub-license, or deal in
              any other manner with this Agreement, or sub-contract any of its
              rights and obligations under this Agreement, to any other party.
            </li>

            <li>
              14.5. This Agreement constitutes the entire understanding and
              agreement between you and LavaX regarding the Service and
              supersedes any prior agreement, understanding, or arrangement
              between you and LavaX.
            </li>

            <li>15. Cryptocurrency</li>
          </ul>
          <br />
          <p className={style.textNormal}>
            CRYPTOCURRENCY VALUES CAN FLUCTUATE GREATLY IN VALUE DEPENDING ON
            MARKET CONDITIONS. THE USER WARRANTS THAT IT IS AWARE OF THE
            VOLATILE NATURE OF CRYPTOCURRENCIES, AND HOLDS LavaX HARMLESS FOR
            ANY LOSS OR DAMAGES ARISING FROM SUCH VOLATILITY
          </p>
        </div>
      </section>
    </div>
  )
}
