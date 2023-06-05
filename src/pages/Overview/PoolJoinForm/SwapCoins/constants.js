import moment from 'moment'

export const FAKE_ALLOCATIONS = [
  {
    id: 1,
    value: 1000,
    picture: '/img/pools/1.png',
    symbol: 'PMON',
    allowClaimAt: new Date('2021-04-11'),
  },
  {
    id: 2,
    value: 1000,
    picture: '/img/pools/1.png',
    symbol: 'PMON',
    allowClaimAt: moment(new Date()).add(24, 'hours').toDate(),
  },
  {
    id: 3,
    value: 1000,
    picture: '/img/pools/1.png',
    symbol: 'PMON',
    allowClaimAt: new Date('2021-04-13'),
    isClaimed: true,
  },
]
