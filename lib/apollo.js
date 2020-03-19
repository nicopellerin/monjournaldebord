import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-hooks'
import { useMemo } from 'react'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import cookies from 'js-cookie'

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

  WithApollo.getInitialProps = async ctx => {
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
        console.error(err)
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
const uri = isDev
  ? 'http://localhost:3000'
  : 'https://monjournaldebord.nicopellerin.now.sh'

const initApolloClient = initialState => {
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

  const httpLink = new HttpLink({
    uri: `${uri}/api/graphql`,
    credentials: 'same-origin',
    fetch: !isBrowser && fetch,
  })

  const authLink = setContext((_, { headers }) => {
    const token = cookies.getJSON('token_login')

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new ApolloClient({
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    fetch,
    cache,
  })
}
