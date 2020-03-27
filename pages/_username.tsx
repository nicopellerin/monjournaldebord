import * as React from 'react'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'

import { withApollo } from '../lib/apollo'
import { useQuery } from '@apollo/react-hooks'

const PublicProfilPage = () => {
  const {
    query: { username },
  } = useRouter()

  const ALL_JOURNALS = gql`
    query allJournals {
      journals {
        id
        title
        text
        image
        createdAt
        mood
      }
    }
  `
  const { data } = useQuery(ALL_JOURNALS)
  console.log(data)
  return <div>{username}</div>
}

export default withApollo(PublicProfilPage)
