import jwt from 'jsonwebtoken'

export const createAccessToken = user => {
  return jwt.sign({ userId: user._id }, process.env.access_token_secret, {
    expiresIn: '7d',
  })
}

export const createRefreshToken = user => {
  return jwt.sign({ userId: user._id }, process.env.refresh_token_secret, {
    expiresIn: '7d',
  })
}
