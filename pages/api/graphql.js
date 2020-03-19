import { ApolloServer, AuthenticationError } from 'apollo-server-micro'
import { mergeTypeDefs, mergeResolvers } from '@graphql-toolkit/schema-merging'

import connectDB from '../../lib/mongoose'

import JournalsSchema from '../../modules/journals/schema.graphql'
import UsersSchema from '../../modules/users/schema.graphql'

import { journalsResolvers } from '../../modules/journals/resolvers'
import { usersResolvers } from '../../modules/users/resolvers'
import getUserFromToken from '../../lib/getUserFromToken'

const typeDefs = mergeTypeDefs([JournalsSchema, UsersSchema])
const resolvers = mergeResolvers([journalsResolvers, usersResolvers])

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || ''
    if (!token) return

    try {
      const user = await getUserFromToken(token)
      return {
        user,
      }
    } catch (err) {
      throw new AuthenticationError('Veuillez vous connecter!')
    }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const server = apolloServer.createHandler({ path: '/api/graphql' })

export default connectDB(server)
