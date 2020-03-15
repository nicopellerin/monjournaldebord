import jwt from 'jsonwebtoken'

import User from '../modules/users/User'

export default async (token, AuthenticationError) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: userId })

    return user
  } catch (err) {
    throw new AuthenticationError('Token not valid')
  }
}
