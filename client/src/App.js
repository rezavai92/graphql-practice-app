import React from 'react'
import {ApolloClient,ApolloProvider,InMemoryCache,gql} from '@apollo/client'
import Layout from './components/layout'
const client = new ApolloClient({
  uri : "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})



const App = ()=>{

  return (
    <ApolloProvider client={client}>
      <Layout>
        
      </Layout>
    </ApolloProvider>
  )
}

export default App;