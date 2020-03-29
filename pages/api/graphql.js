import { ApolloServer } from 'apollo-server-micro'
import { mergeTypeDefs, mergeResolvers } from '@graphql-toolkit/schema-merging'
import cookie from 'cookie'

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
  formatError: err => {
    console.log(err.message)
    return err
  },
  context: async ctx => {
    const { token_login: token } = cookie.parse(ctx.req.headers.cookie ?? '')
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
