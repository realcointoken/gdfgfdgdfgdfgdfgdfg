export function generateLinks(data) {
  return [
    {
      name: 'Website',
      href: data.websiteLink,
      icon: '/img/project_link_icons/web.svg',
    },
    {
      name: 'Medium',
      href: data.mediumLink,
      icon: '/img/project_link_icons/medium.svg',
    },
    {
      name: 'Whitepaper',
      href: data.whitepaperLink,
      icon: '/img/project_link_icons/whitepaper.png',
    },
    {
      name: 'Telegram',
      href: data.telegramLink,
      icon: '/img/project_link_icons/telegram.svg',
    },
    {
      name: 'Twitter',
      href: data.twitterLink,
      icon: '/img/project_link_icons/twitter.svg',
    },
    {
      name: 'Etherscan',
      href: data.etherscanLink,
      icon: '/img/project_link_icons/etherscan.png',
    },
  ].filter((item) => Boolean(item.href))
}
