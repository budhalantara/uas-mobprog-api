const randomString = (length, number = false) => {
  const characters = number
    ? '0123456789'
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

const randomNumber = (min, max) => Math.round(Math.random() * (max - min)) + min

export { randomString, randomNumber }
