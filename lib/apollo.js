import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-hooks'
import { useMemo } from 'react'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import cookies from 'js-cookie'

let apolloClient = null

export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = useMemo(
      () => apolloClient || initApolloClient(apolloState),
      []
    )

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (typeof window === 'undefined') {
    if (ssr) {
      WithApollo.getInitialProps = async ctx => {
        const { AppTree } = ctx

        let pageProps = {}
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx)
        }

        // Run all GraphQL queries in the component tree
        // and extract the resulting data
        const apolloClient = initApolloClient()

        try {
          // Run all GraphQL queries
          await require('@apollo/react-ssr').getDataFromTree(
            <AppTree
              pageProps={{
                ...pageProps,
                apolloClient,
              }}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()

        // Extract query data from the Apollo store
        const apolloState = apolloClient.cache.extract()

        return {
          ...pageProps,
          apolloState,
        }
      }
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

  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }

  return apolloClient
}

const createApolloClient = (initialState = {}) => {
  const isBrowser = typeof window !== 'undefined'
  const cache = new InMemoryCache().restore(initialState)

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
        authorization: token ? `${token}` : '',
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
