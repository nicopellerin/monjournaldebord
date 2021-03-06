import { AuthenticationError } from 'apollo-server-micro'
import * as bcrypt from 'bcryptjs'
import cookie from 'cookie'

import User from './User'
import Mood from './Mood'

import { createAccessToken } from '../../lib/auth'

// Resolver
export const usersResolvers = {
  Query: {
    async me(_, __, { user }) {
      if (user) {
        return user
      }
      return null
    },
    async getAllMoods(_, __, { user }) {
      if (!user) throw new AuthenticationError('Pas authorizé.')

      try {
        const moods = await Mood.find({ author: user._id }).sort({ _id: -1 })
        return moods
      } catch (error) {
        throw new AuthenticationError('Pas authorizé.')
      }
    },
  },
  Mutation: {
    async signupUser(_, { username, email, password, avatar }, ctx) {
      if (!username || !email || !password) {
        throw new AuthenticationError('Veuillez remplir tous les champs requis')
      }

      const user = await User.findOne({ $or: [{ email }, { username }] })
      if (user) {
        throw new AuthenticationError(
          "Ce nom d'utilisateur ou courriel existe déja"
        )
      }

      if (password.length < 6) {
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

      const token = createAccessToken(newUser)

      ctx.res.setHeader(
        'Set-Cookie',
        cookie.serialize('token_login', token, {
          httpOnly: true,
          maxAge: 6 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      )

      return newUser
    },

    async signinUser(_, { email, password }, ctx) {
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
        const token = createAccessToken(user)

        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token_login', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
        )

        return user
      }

      throw new AuthenticationError('Mauvais courriel ou mot de passe')
    },

    async signoutUser(_, __, ctx) {
      ctx.res.setHeader(
        'Set-Cookie',
        cookie.serialize('token_login', '', {
          httpOnly: true,
          maxAge: -1,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      )

      return true
    },

    async updateUser(_, { city, email, avatar, username }, { user }) {
      if (!user) {
        throw new AuthenticationError('Invalid')
      }

      const res = await User.findOneAndUpdate(
        { username },
        { city, email, avatar },
        { new: true }
      )

      return res
    },

    async updateUserPassword(_, { password }, { user }) {
      if (!user) {
        throw new AuthenticationError('Invalid')
      }

      if (password.length < 6) {
        throw new Error(
          'Veuillez entrer un mot de passe de plus de 6 charactères'
        )
      }
      password = await bcrypt.hash(password, 10)

      try {
        await User.findOneAndUpdate(
          { username: user.username },
          { password },
          { new: true }
        )

        return true
      } catch (error) {
        throw new Error('Erreur!')
      }
    },

    async updateDailyMood(_, { mood }, { user }) {
      if (!user) {
        throw new AuthenticationError('Invalid')
      }

      const res = await Mood.create({ author: user, mood })

      return res
    },

    async deleteSingleMood(_, { id }, { user }) {
      if (!user) {
        throw new AuthenticationError('Invalid')
      }

      try {
        const res = await Mood.findByIdAndDelete(id)

        return res
      } catch (error) {
        throw new AuthenticationError('Invalid')
      }
    },
  },
  Mood: {
    author: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('Pas authorizé.')
      }

      return {
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
      }
    },
  },
}
