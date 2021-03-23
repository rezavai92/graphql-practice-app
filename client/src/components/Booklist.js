import React from 'react'
import {gql,useQuery} from '@apollo/client'

export default function Booklist() {

    const getAllBooksQuery = gql`
        
            {
                books{
                  id
                  name
                  genre
                  author{
                    name
                  }
                }

            }
             `

    
   
    const {error,loading,data} = useQuery(getAllBooksQuery)
 
    console.log(data)
    const getAllBooks =()=>{
       
        if(loading){
            return <p>
                Loading
            </p>
        }
        else {
            return data.books.map((book)=>{
                return(<li key={book.id} >
                    {book.name}
                </li>)
            })
        }
    }
    return (
        <div>
            <h1>
                List of Books
            </h1>

            <div>
                <ul>
                        {getAllBooks()}
                </ul>
            </div>
        </div>
    )
}
