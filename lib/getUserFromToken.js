import jwt from 'jsonwebtoken'

import User from '../modules/users/User'

export default async token => {
  // if (!token) {
  //   throw new Error('Not authed')
  //   return
  // }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: userId })

    return user
  } catch (err) {
    console.error(err.message)
  }
}
