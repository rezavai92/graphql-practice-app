import React,{useState,useEffect} from 'react'
import {gql,useQuery,useMutation} from '@apollo/client'
import BookDetails from './BookDetails'

import {getAllBooks, getBook} from '../query/bookQuery'
import {removeBook,modifyBook} from '../mutation/bookMutation'
import './booklist.css'
export default function Booklist(props) {

    const [selectedBookId,setSelectedBookId] = useState(null)
    const [selectedBookForEdit,setSelectedBookForEdit] = useState(null)
    const [deleteBook] = useMutation (removeBook)
    const [updatedBookName,setUpdatedBookName] = useState("")
    const [selectedBookName,setSelectedBookName] = useState("")
    const[selectedGenre,setSelectedGenre] = useState("")
    const [selectedAuthor,setSelectedAuthor] = useState("")
    const [updatedGenre,setUpdatedGenre] = useState("")
    const [updatedAuthor,setUpdatedAuthor] = useState("")
    const [willShowEditBox,setWillShowEditBox] = useState(false)

    
    useEffect (()=>{

        setUpdatedBookName(selectedBookName)
        setUpdatedGenre(selectedGenre)
        setUpdatedAuthor(selectedAuthor)
    },[selectedBookForEdit])
    //mapped authors
 
    console.log("selected author is" ,selectedAuthor )
    const mappedOptions = props.authors.map((author)=>{

        return <option value ={author.id}  >
             
            {author.name}
        </option>
       })
    // delete Book
    const deleteBookHandler=(bookId)=>{
        deleteBook({
            variables:{
                id:bookId
            },
            refetchQueries:[{query:getAllBooks}]
        })
    }

    // edit book


    const [updateBook] =  useMutation(modifyBook);
    const editBookhandler = (bookId,bookName,genre,authorId)=>{
     
        setWillShowEditBox (true);
        setSelectedBookName(bookName)
        setSelectedGenre(genre)
        setSelectedAuthor(authorId)
        setSelectedBookForEdit(bookId)
       
        

    }


    const saveUpdatedBook = ()=>{


        updateBook( {
            variables:{
                id : selectedBookForEdit,
                updatedBook :{
                    name : updatedBookName,
                    genre : updatedGenre,
                    authorId : updatedAuthor
                }
            },
            refetchQueries:[{query:getAllBooks}]
        } )

        setWillShowEditBox(false)
       
    }

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
     

       return(<BookDetails 
       bookDetails={{bookName:data.book.name,genre:data.book.genre,bookId:data.book.id,authorName: data.book.author.name,authorId:data.book.author.id,otherBooksOfThisAuthor:data.book.author.books }}  >

       </BookDetails>)
    }
   
   
 
  
    const getBooks =()=>{
       
      
            
            return props.books.map((book)=>{

                return(<li key={book.id}  onDoubleClick={()=>{setSelectedBookId(book.id) }}  className="booklist"  >
                    {book.name}
                    <span style={{float:"right"}} >
                        <button onClick={()=>{editBookhandler(book.id,book.name,book.genre,book.author.id)}} > edit</button>
                        <button onClick={()=>{deleteBookHandler(book.id)}} >X</button>

                    </span>

                  {willShowEditBox && selectedBookForEdit===book.id? 
                  
                    <span>
                         <input  type="text"  value ={updatedBookName} onChange ={(e)=>{setUpdatedBookName(e.target.value)}} /> 
                        <input type = 'text' value ={updatedGenre} onChange ={ (e)=>{setUpdatedGenre (e.target.value)} } />
                        <select value={updatedAuthor} onChange ={(e)=>{setUpdatedAuthor(e.target.value)}} >
                            {mappedOptions}
                        </select>

                        <button onClick={()=>{saveUpdatedBook()}} >save</button>
                        <button onClick={()=>{setWillShowEditBox(false)}} >cancel</button>
                    </span>
                  
                  :null}
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
