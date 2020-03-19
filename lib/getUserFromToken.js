import { verify } from 'jsonwebtoken'

import User from '../modules/users/User'

export default async token => {
  const getToken = token.split(' ')[1]

  const { userId } = verify(getToken, process.env.ACCESS_TOKEN_SECRET)

  const user = await User.findOne({ _id: userId })

  return user
}
