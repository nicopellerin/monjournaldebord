import { AuthenticationError } from 'apollo-server-micro'
import User from './User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const usersResolvers = {
  Query: {
    me(parent, args, { user }, info) {
      return user
    },
  },
  Mutation: {
    async signupUser(parent, { username, email, password, avatar }, ctx, info) {
      const user = await User.findOne({ email })
      if (user) {
        throw new AuthenticationError('Invalid')
      }

      if (email.length < 6) {
        throw new AuthenticationError(
          'Veuillez entrer un mot de passe de plus de 6 charactères'
        )
      }

      const hash = await bcrypt.hash(password, 10)

      const newUser = await new User({
        username,
        email,
        password: hash,
        avatar,
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
        throw new AuthenticationError('Invalid')
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

    async updateDailyMood(parent, { mood }, { user }) {
      if (!user) {
        throw new AuthenticationError('Invalid')
      }

      const res = await User.findOneAndUpdate(
        { _id: user.id },
        { $set: { dailyMood: mood } },
        { new: true }
      )

      return res
    },
  },
}
