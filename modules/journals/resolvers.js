import { AuthenticationError } from 'apollo-server-micro'
import { GraphQLScalarType, Kind } from 'graphql'

import Journal from './Journal'

export const journalsResolvers = {
  Query: {
    async journals(parent, args, { user }, info) {
      if (!user) {
        throw new AuthenticationError('Pas authorizé.')
      }

      const allJournals = await Journal.find({ author: user._id })
        .populate({ path: 'users', model: 'users' })
        .sort({ _id: -1 })

      return allJournals
    },
    journal(parent, { id }, { user }, info) {
      if (!user) {
        throw new AuthenticationError('Pas authorizé.')
      }

      const journalFound = Journal.findById(id)
      if (!journalFound) {
        throw new Error('Journal not found')
      }

      return journalFound
    },
  },
  Mutation: {
    async addJournal(parent, args, { user }, info) {
      if (!user) {
        throw new AuthenticationError('Pas authorizé.')
      }

      const newJournal = { ...args, author: user }

      try {
        const res = await Journal.create(newJournal)
        return res
      } catch (err) {
        console.error(err)
      }
    },
    async editJournal(parent, args, { user }, info) {
      if (!user) {
        throw new AuthenticationError('Pas authorizé.')
      }

      const editedJournal = { ...args }
      try {
        await Journal.findByIdAndUpdate(args.id, editedJournal)
        return editedJournal
      } catch (err) {
        console.error(err)
      }
    },
    async deleteJournal(parent, { id }, { user }, info) {
      if (!user) {
        throw new AuthenticationError('Pas authorizé.')
      }

      try {
        const deletedJournal = await Journal.findByIdAndDelete(id)
        return deletedJournal
      } catch (err) {
        console.error(err)
      }
    },
  },

  Journal: {
    author: (parent, args, { user }, info) => {
      if (!user) {
        throw new AuthenticationError('Pas authorizé.')
      }

      return {
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        journals: user.journals,
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
