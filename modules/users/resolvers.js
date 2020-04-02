import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import bcrypt from 'bcryptjs'
import cookie from 'cookie'

import User from './User'
import Mood from './Mood'

import getUserFromToken from '../../lib/getUserFromToken'
import { createAccessToken } from '../../lib/auth'

const cache = {
  lastFetch: 0,
  moods: [],
}

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

      // const timeSinceLastFetch = Date.now()

      // if (timeSinceLastFetch <= 1800000) {
      //   console.log(cache)
      //   return cache.moods
      // }

      try {
        const moods = await Mood.find({ author: user._id }).sort({ _id: -1 })
        // cache.lastFetch = Date.now()
        // cache.moods = moods
        return moods
      } catch (error) {
        throw new AuthenticationError('Pas authorizé.')
      }
    },
  },
  Mutation: {
    async signupUser(parent, { username, email, password, avatar }, ctx, info) {
      if (!username || !email || !password) {
        throw new AuthenticationError('Veuillez remplir tous les champs requis')
      }

      const user = await User.findOne({ $or: [{ email }, { username }] })
      if (user) {
        throw new AuthenticationError(
          "Ce nom d'utilisateur ou courriel existe déja"
        )
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

    async signinUser(parent, { email, password }, { res }, info) {
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

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token_login', token, {
            httpOnly: true,
            maxAge: 6 * 6 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          })
        )

        return user
      }

      throw new AuthenticationError('Mauvais courriel ou mot de passe')
    },

    async signoutUser(parent, args, ctx, info) {
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

    async updateCity(_, { city, username }, { user }) {
      if (!user) {
        throw new AuthenticationError('Invalid')
      }

      const res = await User.findOneAndUpdate({ username }, { city })

      return res
    },

    async updateDailyMood(_, { mood }, { user }) {
      if (!user) {
        throw new AuthenticationError('Invalid')
      }

      const res = await Mood.create({ author: user, mood })

      return res
    },

    async deleteSingleMood(_, { id }, ctx) {
      const { token_login: token } = cookie.parse(ctx.req.headers.cookie || '')

      if (token) {
        try {
          const res = await Mood.findByIdAndDelete(id)

          return res
        } catch (error) {
          throw new AuthenticationError('Invalid')
        }
      }
    },
  },
  Mood: {
    author: async (parent, args, ctx) => {
      const token = ctx.req.cookies['token_login']
      const user = await getUserFromToken(token)

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
