import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'

let globalApolloClient = null

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState)

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  WithApollo.getInitialProps = async (ctx) => {
    const { AppTree } = ctx
    const apolloClient = (ctx.apolloClient = initApolloClient())

    let pageProps = {}
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx)
    }

    if (typeof window === 'undefined') {
      if (ctx.res && ctx.res.finished) {
        return pageProps
      }

      try {
        const { getDataFromTree } = await import('@apollo/react-ssr')

        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient,
            }}
          />
        )
      } catch (err) {
        console.log('yo')
      }

      Head.rewind()
    }

    const apolloState = apolloClient.cache.extract()

    return {
      ...pageProps,
      apolloState,
    }
  }

  return WithApollo
}

const isDev = process.env.NODE_ENV !== 'production'
const uri = isDev ? 'http://localhost:3000' : 'https://monjournaldebord.ca'

const initApolloClient = (initialState) => {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState)
  }

  return globalApolloClient
}

const createApolloClient = (initialState = {}) => {
  const isBrowser = typeof window !== 'undefined'
  const cache = new InMemoryCache({
    cacheRedirects: {
      Query: {
        journal: (_, args, { getCacheKey }) =>
          getCacheKey({ __typename: 'Journal', id: args.id }),
      },
    },
  })

  return new ApolloClient({
    ssrMode: !isBrowser,
    link: createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
      createHttpLink({ uri: `${uri}/api/graphql` })
    ),
    fetch,
    cache,
  })
}
