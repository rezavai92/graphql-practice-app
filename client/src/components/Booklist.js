import React from 'react'
import {gql,useQuery} from '@apollo/client'

export default function Booklist(props) {

    

    
   
   console.log(props)
 
  
    const getBooks =()=>{
       
      
            
            return props.books.map((book)=>{
                return(<li key={book.id}   >
                    {book.name}
                </li>)
            })
        }
    
    return (
        <div>
            <h1>
                List of Books
            </h1>

            <div>
                <ul>
                        {getBooks()}
                </ul>
            </div>
        </div>
    )
}
