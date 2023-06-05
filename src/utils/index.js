export function formatNumber(
  value,
  prefix = '',
  fixed_amount = 0,
  thousands_separator = ',',
) {
  const newValue = normalizeValue(value)

  if (isNaN(value)) {
    return 'NaN'
  }

  return (
    prefix +
    separateThousands(newValue.toFixed(fixed_amount), thousands_separator)
  )
}

function normalizeValue(value) {
  if (typeof value === 'string') {
    return parseFloat(value)
  }

  return value
}

export function separateThousands(x, s) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, s)
}

export function formatBlockchainAddress(address) {
  if (!address) {
    return ''
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function validateEmail(email) {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const getQueryParam = (name, defaultData = '') => {
  const q = window.location.search.match(
    new RegExp('[?&]' + name + '=([^&#]*)'),
  )
  return q ? q[1] : defaultData
}
