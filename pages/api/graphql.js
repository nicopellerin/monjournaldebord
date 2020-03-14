import { ApolloServer } from 'apollo-server-micro'
import { mergeTypeDefs, mergeResolvers } from 'graphql-toolkit'

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
    const token = req.headers.authorization
    const user = await getUserFromToken(token)
    return {
      user,
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
