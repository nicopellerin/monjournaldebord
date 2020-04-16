import { verify } from 'jsonwebtoken'

import User from '../modules/users/User'

const getUserFromToken = async (token) => {
  try {
    const { userId } = verify(token, process.env.access_token_secret)
    const user = await User.findOne({ _id: userId })
    return user
  } catch (error) {
    return error
  }
}

export default getUserFromToken
