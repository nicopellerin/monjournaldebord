import { GraphQLScalarType, Kind } from "graphql"

import Journal from "./Journal"

export const journalsResolvers = {
  Query: {
    journals(parent, args, ctx, info) {
      return []
    },
    journal(parent, args, ctx, info) {
      return {}
    }
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date field",
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
    }
  })
}
