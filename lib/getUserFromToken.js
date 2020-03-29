import { verify } from 'jsonwebtoken'

import User from '../modules/users/User'

export default async token => {
  const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET)

  try {
    const user = await User.findOne({ _id: userId })
    return user
  } catch (error) {
    return error
  }
}
