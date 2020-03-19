import { AuthenticationError } from 'apollo-server-micro'
import bcrypt from 'bcryptjs'

import User from './User'

import { createAccessToken } from '../../lib/auth'

// Resolver
export const usersResolvers = {
  Query: {
    me(parent, args, { user }, info) {
      return user
    },
  },
  Mutation: {
    async signupUser(parent, { username, email, password, avatar }, ctx, info) {
      if (!username || !email || !password) {
        throw new AuthenticationError('Veuillez remplir tous les champs requis')
      }

      const user = await User.findOne({ email })
      if (user) {
        throw new AuthenticationError('Un utilisateur existe déja')
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

      return { token: createAccessToken(newUser) }
    },

    async signinUser(parent, { email, password }, ctx, info) {
      if (!email || !password) {
        throw new AuthenticationError(
          'Veuillez entre un courriel et mot de passe'
        )
      }

      const user = await User.findOne({ email })

      if (!user) {
        throw new AuthenticationError('Mauvais courriel ou mot de passe')
      }
      const passwordsMatch = await bcrypt.compare(password, user.password)
      if (passwordsMatch) {
        return { token: createAccessToken(user) }
      }

      throw new AuthenticationError('Mauvais courriel ou mot de passe')
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
