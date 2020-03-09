import { GraphQLScalarType, Kind } from 'graphql'

import Journal from './Journal'

export const journalsResolvers = {
  Query: {
    async journals(parent, args, ctx, info) {
      const allJournals = await Journal.find()
      const allJournalsSorted = allJournals.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1
        }
        //  4 juillet < 5 juillet
        if (a.createdAt < b.createdAt) {
          return 1
        }

        return 0
      })

      return allJournalsSorted
    },
    journal(parent, { id }, ctx, info) {
      const journalFound = Journal.findById(id)
      if (!journalFound) return
      return journalFound
    },
  },
  Mutation: {
    async addJournal(parent, args, ctx, info) {
      const newJournal = { ...args }

      if (!newJournal) return

      try {
        const res = await Journal.create(newJournal)
        return res
      } catch (err) {
        console.error(err)
      }
    },
    async editJournal(parent, args, ctx, info) {
      const editedJournal = { ...args }
      try {
        await Journal.findByIdAndUpdate(args.id, editedJournal)
        return editedJournal
      } catch (err) {
        console.error(err)
      }
    },
    async deleteJournal(parent, { id }, ctx, info) {
      try {
        const deletedJournal = await Journal.findByIdAndDelete(id)
        return deletedJournal
      } catch (err) {
        console.error(err)
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
