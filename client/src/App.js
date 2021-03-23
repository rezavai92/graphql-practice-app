import React from 'react'
import {ApolloClient,ApolloProvider,InMemoryCache,gql} from '@apollo/client'
import Booklist from "./components/Booklist"
import Addbook from './components/Addbook'
const client = new ApolloClient({
  uri : "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})



const App = ()=>{

  return (
    <ApolloProvider client={client}>
       <div>
          <Addbook/>
          <Booklist>

          </Booklist>
      </div>
    </ApolloProvider>
  )
}

export default App;