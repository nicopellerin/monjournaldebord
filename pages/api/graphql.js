import { ApolloServer, gql } from "apollo-server-micro"
import { mergeResolvers, mergeTypeDefs } from "graphql-toolkit"

import connectDB from "../../lib/mongoose"

import JournalsSchema from "../../api/journals/schema.graphql"
import { journalsResolvers } from "../../api/journals/resolvers"

const typeDefs = mergeTypeDefs([JournalsSchema])

const resolvers = mergeResolvers([journalsResolvers])

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false
  }
}

const server = apolloServer.createHandler({ path: "/api/graphql" })
export default connectDB(server)
