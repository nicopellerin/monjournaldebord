import { ApolloServer } from 'apollo-server-micro'

import connectDB from '../../lib/mongoose'

import JournalsSchema from '../../modules/journals/schema.graphql'
import { journalsResolvers } from '../../modules/journals/resolvers'

const apolloServer = new ApolloServer({
  typeDefs: JournalsSchema,
  resolvers: journalsResolvers,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const server = apolloServer.createHandler({ path: '/api/graphql' })

export default connectDB(server)
