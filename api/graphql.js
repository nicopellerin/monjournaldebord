import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro'
import { mergeTypeDefs, mergeResolvers } from '@graphql-toolkit/schema-merging'
import cookie from 'cookie'

import connectDB from '../lib/mongoose'

import { journals } from '../modules/journals/schema.js'
import { users } from '../modules/users/schema.js'

import { journalsResolvers } from '../modules/journals/resolvers'
import { usersResolvers } from '../modules/users/resolvers'

import getUserFromToken from '../lib/getUserFromToken'

const typeDefs = mergeTypeDefs([users, journals])
const resolvers = mergeResolvers([journalsResolvers, usersResolvers])
const schema = makeExecutableSchema({ typeDefs, resolvers })

const apolloServer = new ApolloServer({
  schema,
  context: async ctx => {
    const { token_login: token } = cookie.parse(ctx.req.headers.cookie || '')
    if (!token) return ctx

    try {
      const user = await getUserFromToken(token)
      return { ...ctx, user }
    } catch (err) {
      return ctx
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
