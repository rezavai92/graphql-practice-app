import React,{useState} from 'react'
import {gql,useQuery} from '@apollo/client'
import BookDetails from './BookDetails'
import {getBook} from '../query/bookQuery'
export default function Booklist(props) {

    const [selectedBookId,setSelectedBookId] = useState(null)
    console.log(selectedBookId)

    const ShowBookDetail=({bookId})=>{
     //   const [willShowBookDetails,setwillShowDetails] = useState(false)
    
        console.log("from show book details")
        const {data,loading,error} = useQuery(getBook,{
            variables:{
                id:bookId
            }
        });
        console.log("book details are",data)
       

       if(loading){
           return(<p>
               Loading ...
           </p>)
       }
     

       return(<BookDetails bookDetails={{bookName:data.book.name,genre:data.book.genre,bookId:data.book.id,authorName: data.book.author.name,authorId:data.book.author.id,otherBooksOfThisAuthor:data.book.author.books }}  >

       </BookDetails>)
    }
   
   
 
  
    const getBooks =()=>{
       
      
            
            return props.books.map((book)=>{
                return(<li key={book.id}  onClick={()=>{setSelectedBookId(book.id) }}  >
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

            <div>
             
            </div>

        {selectedBookId? <ShowBookDetail bookId ={selectedBookId} /> :<p>No book is selected</p>}
        </div>
    )
}
