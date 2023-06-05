import twitter from './img/twitter.svg'
import medium from './img/medium.svg'
import telegram from './img/telegram.svg'
import etherscan from './img/etherscan.png'

export function getSocialList(data) {
  let result = []

  if (data.twitterLink) {
    result.push({
      name: 'Twitter',
      icon: twitter,
      href: data.twitterLink,
    })
  }

  if (data.telegramLink) {
    result.push({
      name: 'Telegram',
      icon: telegram,
      href: data.telegramLink,
    })
  }

  if (data.mediumLink) {
    result.push({
      name: 'Medium',
      icon: medium,
      href: data.mediumLink,
    })
  }

  if (data.etherscanLink) {
    result.push({
      name: 'EtherScan',
      icon: etherscan,
      href: data.etherscanLink,
    })
  }
  if (data.bscScanLink) {
    result.push({
      name: 'BSCScan',
      icon: etherscan,
      href: data.bscScanLink,
    })
  }

  return result
}
