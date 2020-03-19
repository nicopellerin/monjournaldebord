import jwt from 'jsonwebtoken'

export const createAccessToken = user => {
  return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  })
}

export const createRefreshToken = user => {
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  })
}
