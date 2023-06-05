import React from 'react'
import cn from 'classnames'
import style from './PrivacyPolicy.module.scss'

import x1 from './img/1.png'
import Cta from '../../components/Cta'
import TextGradient from '../../components/TextGradient'
import Bubbles from '../../components/Bubbles'

export default function PrivacyPolicy(props) {
  return (
    <div className={cn(style.container, 'content')}>
      <Bubbles />
      <section className={style.section1}>
        <Cta
          primary
          wrapperClass={style.cta}
          title={
            <>
              <span className={style.wordSpace}> Privacy</span>{' '}
              <TextGradient text={'Policy.'} />
            </>
          }
        >
          {/* <img className={style.x} src={x1} alt={''} /> */}
        </Cta>
      </section>

      <p className={style.textNormal}>
        Herein is provided the privacy policy of LavaX(owner and operator of
        https://www.lavax.org/) This Privacy Policy describes how
        https://www.lavax.org/ will manage end user’s personal information
        which we collect as a result of your use of https://www.lavax.org/,
        your use of our websites located at https://www.lavax.org/ and any
        pages or websites under the 'LavaX' brand including any tablet or
        mobile phone applications that are owned and/or operated by us or
        whenever we otherwise deal with you. lavaxis committed to ensuring that
        the personal information we collect about you is protected and is used,
        stored and disclosed in accordance with the Privacy Act and this Privacy
        Policy.
      </p>

      <section className={style.section2}>
        <div className={style.separately}>
          <h2 className={style.textBold}>Website Use</h2>
          <p className={style.textNormal}>
            In using the website, you agree to be bound by the terms of this
            Privacy Policy. https://www.lavax.org/ may review the Privacy
            Policy periodically and reserves the right to change the Privacy
            Policy at any time at its discretion by posting such changes on the
            website. Changes will be effective immediately when posted on the
            website. The end users’ continued use of the website following
            posting will constitute your acceptance of those changes.
          </p>
          <br />

          <p className={style.textNormal}>
            This Privacy Policy will not apply to websites which are linked to
            the website and over which https://www.lavax.org/ has no control.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>Personal Information</h2>
          <p className={style.textNormal}>
            The kinds of Personal Information that https://www.lavax.org/ may
            collect from you is:
          </p>
          <br />
          <h2 className={style.textBold}>Name</h2>
          <h2 className={style.textBold}>Email address</h2>
          <h2 className={style.textBold}>Personally submitted preferences</h2>
          <h2 className={style.textBold}>Location data</h2>
          <h2 className={style.textBold}>IP address</h2>
          <h2 className={style.textBold}>Collection Purposes</h2>

          <p className={style.textMargin}>
            https://www.lavax.org/ will collect your Personal Information only
            by lawful and fair means and not in an intrusive way to operate its
            Service, and to provide you with the following information:
          </p>

          <p className={style.textMargin}>
            If you wish to subscribe to https://www.lavax.org/ weekly
            newsletter or other marketing communications.
          </p>
          <p className={style.textMargin}>
            To update you on technical progress of LavaX labs.
          </p>
          <p className={style.textMargin}>
            To provide services to you as a User.
          </p>
          <p className={style.textMargin}>
            To identify you as a User for security purposes and to comply with
            our legal obligations.
          </p>
          <p className={style.textMargin}>To maintain your User account.</p>
          <p className={style.textMargin}>
            To upgrade and enhance your experience within the website or over
            the telephone, or to tailor or develop information, services or
            products to suit your needs which may include market research and
            conducting promotions.
          </p>
          <p className={style.textMargin}>
            To tell you about our products or services that we think may be of
            interest to you by communicating with you via email, SMS or
            telephone.
          </p>
          <p className={style.textMargin}>
            To create aggregate data about Users through demographic profiling,
            statistical analysis of the database to provide to potential and
            existing lavaxholders, and to allow for more efficient operation of
            https://www.lavax.org/ business.
          </p>
          <p className={style.textMargin}>
            To comply with https://www.lavax.org/ legal and statutory
            obligations.
          </p>
          <p className={style.textMargin}>
            For taking appropriate action if LavaX.org has reason to suspect
            that unlawful activity or misconduct of a serious nature has been,
            is being or may be engaged in that relates to our functions and
            activities.
          </p>
          <p className={style.textMargin}>
            To establish, exercise or defend any legal claims.
          </p>
          <p className={style.textMargin}>Manage job applications.</p>
          <p className={style.textMargin}>
            You may choose to deal with us on an anonymous basis or to use a
            pseudonym unless it is not practicable for us to deal with
            individuals who we cannot identify or we are required by law to only
            deal with identified individuals. Also, if you do not provide
            https://www.lavax.org/ with the Personal Information we request, we
            may be unable to process your request to become a User, provide you
            with our services or respond to your enquiry or complaint. Examples
            of Personal Information that may be collected by
            https://www.lavax.org/ include your name, email address, telephone
            numbers, your date of birth, other verification information such as
            your Service usage activities. By becoming a User or otherwise
            choosing to provide LavaX.org with Personal Information you consent
            to https://www.lavax.org/ collecting, using and disclosing your
            Personal Information for the above purposes.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>Direct Marketing and Opting Out</h2>
          <p className={style.textNormal}>
            Occasionally we may use your Personal Information to inform you
            about https://www.lavax.org/ products or services or about
            promotional activities which https://www.lavax.org/ believes may be
            of interest or of benefit to you. We may do this via email, SMS,
            telephone or mail. If you no longer wish to receive marketing or
            promotional material from https://www.lavax.org/ at all or in any
            particular form, you may contact us at any time by email to
            support@LavaX.org with your request with which we will comply as
            soon as is practical. From time to time we may contact you in
            relation to the management and administration of your
            https://www.lavax.org/ account. These communications can be via any
            of the modes of contact recorded when registering as a User. Such
            communication does not affect your opt-in or opt-out status for
            direct marketing communications.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>
            Management of your Personal Information
          </h2>
          <p className={style.textNormal}>
            https://www.lavax.org/ will take all reasonable steps to ensure
            that the Personal Information which it collects, uses or discloses
            is correct and is stored in a secure environment which is accessed
            only by authorised persons.
          </p>
          <br />

          <p className={style.textNormal}>
            https://www.lavax.org/ will destroy or permanently de-identify the
            Personal Information we hold when it is no longer required for any
            purpose permitted under the APPs including our legal or operational
            obligations.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>Security of Personal Information</h2>
          <p className={style.textNormal}>
            You acknowledge that no data transmission over the Internet is
            totally secure. Accordingly, https://www.lavax.org/ does not
            warrant the security of any information which you transmit to it.
            Any information which you transmit to https://www.lavax.org/ is
            transmitted at your own risk. However, once https://www.lavax.org/
            receives your transmission, https://www.lavax.org/ will take
            reasonable steps to protect your Personal Information from misuse,
            loss and unauthorised access, modification and disclosure including
            by using password protected systems and databases and Secure Socket
            Layer (SSL) technology.
          </p>
          <br />

          <p className={style.textNormal}>
            https://www.lavax.org/ employees, agents and contractors are
            required to maintain the confidentiality of Users’ Personal
            Information and trading behaviour.
          </p>
          <br />

          <p className={style.textNormal}>
            Information posted on bulletin boards or communicated within a
            social media environment (for example, Facebook, Twitter, Chat
            Rooms) becomes public information. https://www.lavax.org/ cannot
            guarantee the security of this type of disclosed information.
          </p>
          <br />

          <p className={style.textNormal}>
            We take seriously the responsibility to exclude children from access
            to our services. We will not accept their information for the
            purposes of accessing or using the Service. It is however,
            ultimately the responsibility of parents or guardians to monitor
            their children’s Internet activities including where appropriate by
            using Internet screening software.
          </p>
          <br />

          <p className={style.textNormal}>
            Remember to always log out of your account when you have completed
            your time on the website. This is particularly important if you
            share a computer with another person. You are responsible for the
            security of and access to your own computer, mobile device or any
            other handset used to access the website.
          </p>
          <br />

          <p className={style.textNormal}>
            Ultimately, you are solely responsible for maintaining the secrecy
            of your username, password and any account information. Please be
            careful whenever using the Internet and our website.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>Access to Personal Information</h2>
          <p className={style.textNormal}>
            You may access the Personal Information collected by
            https://www.lavax.org/ by contacting us at support@LavaX.org. We
            will give you access to your Personal Information in the manner
            requested if that is possible and within a reasonable period. If we
            refuse your request or cannot give you access in the manner you have
            requested, we will do what we can to meet your requirements by other
            means. We may not be required to give you access to your Personal
            Information in certain circumstances which are set out in the APPs
            including where it may have an unreasonable impact on other
            individual's privacy. If we refuse access for such reasons, we will
            advise you in writing of the refusal and our reasons and the
            complaint mechanisms available to you.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>Use of Website</h2>
          <p className={style.textNormal}>
            By using this website, you agree to LavaX.org collecting and
            processing your Personal Information on the basis explained in this
            Privacy Policy.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>Contact Details</h2>
          <p className={style.textNormal}>
            If you have any queries, requests for access or correction or
            complaints relating to the handling of your personal information,
            please contact us by email.
          </p>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>Email: support@LavaX.org</h2>
        </div>

        <div className={style.separately}>
          <h2 className={style.textBold}>Updates to this Privacy Policy</h2>
          <p className={style.textNormal}>
            https://www.lavax.org/ may review, change and update this Privacy
            Policy to reflect our current practices and obligations. We will
            publish our current Privacy Policy on our website at www.LavaX.org
            and the changes will take effect at the time of publishing. You
            should review this privacy policy regularly and remain familiar with
            its terms.
          </p>
        </div>
      </section>
    </div>
  )
}
