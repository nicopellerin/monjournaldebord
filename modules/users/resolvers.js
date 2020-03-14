import User from './User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const usersResolvers = {
  Query: {
    me(parent, args, { user }, info) {
      return user
    },
  },
  Mutation: {
    async signupUser(parent, { username, email, password }, ctx, info) {
      const user = await User.findOne({ email })
      if (user) {
        throw new Error('Email already exists')
      }

      const hash = await bcrypt.hash(password, 10)

      const newUser = await new User({
        username,
        email,
        password: hash,
      }).save()

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      })

      const authedUser = { ...newUser._doc, token }

      return authedUser
    },

    async signinUser(parent, { email, password }, ctx, info) {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('User does not exist')
      }

      const passwordsMatch = await bcrypt.compare(password, user.password)

      if (passwordsMatch) {
        const token = await jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: '7d',
          }
        )

        const authedUser = { ...user._doc, token }

        return authedUser
      }
    },
  },
}
