import { AuthenticationError } from 'apollo-server-micro'
import { GraphQLScalarType, Kind } from 'graphql'

import Journal from './Journal'
import User from '../users/User'

export const journalsResolvers = {
  Query: {
    async journals(_, __, { user }) {
      if (!user) throw new AuthenticationError('Pas authorizé.')

      try {
        const allJournals = await Journal.find({ author: user._id }).sort({
          _id: -1,
        })

        return allJournals
      } catch (error) {
        throw new AuthenticationError('Pas authorizé.')
      }
    },
    async journal(_, { id }, { user }) {
      if (!user) throw new AuthenticationError('Pas authorizé.')

      try {
        const journalFound = await Journal.findById(id)
        if (!journalFound) {
          throw new Error('Journal not found')
        }
        return journalFound
      } catch (error) {
        throw new AuthenticationError('Pas authorizé.')
      }
    },

    async publicJournals(_, { username }) {
      const { _id: id, avatar, city } = await User.findOne(
        { username },
        '_id avatar city'
      )

      const publicJournals = await Journal.find({
        author: id,
        status: 'public',
      }).sort({
        _id: -1,
      })

      return { journals: publicJournals, avatar, city }
    },

    async publicJournal(_, { id }) {
      try {
        const journalFound = await Journal.findOne({
          _id: id,
          status: 'public',
        })

        if (!journalFound) {
          throw new Error('Journal not found')
        }

        return journalFound
      } catch (error) {
        throw new Error('Not found')
      }
    },
  },
  Mutation: {
    async addJournal(_, args, { user }) {
      if (!user) throw new AuthenticationError('Pas authorizé.')

      const newJournal = { ...args, author: user }

      try {
        const res = await Journal.create(newJournal)
        return res
      } catch (err) {
        console.error(err)
      }
    },
    async editJournal(_, args, { user }) {
      if (!user) throw new AuthenticationError('Pas authorizé.')

      const editedJournal = { ...args }
      try {
        const res = await Journal.findByIdAndUpdate(args.id, editedJournal, {
          new: true,
        })

        return res
      } catch (err) {
        console.error(err)
      }
    },
    async deleteJournal(_, { id }, { user }) {
      if (!user) throw new AuthenticationError('Pas authorizé.')

      try {
        const deletedJournal = await Journal.findByIdAndDelete(id)
        return deletedJournal
      } catch (error) {
        throw new AuthenticationError('Pas authorizé.')
      }
    },
  },

  Journal: {
    author: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Pas authorizé.')

      try {
        return {
          username: user.username,
          email: user.email,
          password: user.password,
          createdAt: user.createdAt,
        }
      } catch (error) {
        throw new AuthenticationError('Pas authorizé.')
      }
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date field',
    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value)
      }

      return null
    },
  }),
}
