import { AuthenticationError } from 'apollo-server-micro'
import { GraphQLScalarType, Kind } from 'graphql'

import Journal from './Journal'

export const journalsResolvers = {
  Query: {
    async journals(parent, args, { user }, info) {
      if (user) {
        try {
          const allJournals = await Journal.find({ author: user._id }).sort({
            _id: -1,
          })
          return allJournals
        } catch (error) {
          throw new AuthenticationError('Pas authorizé.')
        }
      }
    },
    async journal(parent, { id }, { user }, info) {
      // if (!user) {
      //   throw new AuthenticationError('Pas authorizé.')
      // }

      if (user) {
        try {
          const journalFound = Journal.findById(id)
          if (!journalFound) {
            throw new Error('Journal not found')
          }

          return journalFound
        } catch (error) {
          throw new AuthenticationError('Pas authorizé.')
        }
      }
    },
  },
  Mutation: {
    async addJournal(parent, args, { user }, info) {
      if (!user) {
        throw new AuthenticationError('Pas authorizé.')
      }

      const newJournal = { ...args, author: user }

      console.log(args)

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
        const res = await Journal.findByIdAndUpdate(args.id, editedJournal, {
          new: true,
        })

        return res
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
      } catch (error) {
        throw new AuthenticationError('Pas authorizé.')
      }
    },
  },

  Journal: {
    author: async (parent, args, { user }, info) => {
      if (user) {
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
