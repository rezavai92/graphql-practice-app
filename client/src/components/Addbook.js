import React,{useState} from 'react'
import {gql,useMutation,useQuery} from '@apollo/client'
import {getDropDownAuthors} from '../query/authorQuery'
import { getAllBooks } from '../query/bookQuery'
export default function Addbook(props) {

    const [bookName,setBookName] = useState("")
    const [genre,setGenre] = useState("")
    const [authorId,setAuthorId] = useState("")

    
console.log("author id is",authorId)
  // add book mutation 
    const ADD_BOOK=gql`
       mutation addBook($name:String!,$genre:String!,$authorId:String!){

        addBook(name:$name,genre:$genre,authorId:$authorId){
            name,
            genre
        }
       }
          
    `
    // query for fetching author details
    
    const {data : authors,loading:authorsLoading,error} = useQuery(getDropDownAuthors)

    console.log("authors are ",authors)
    const [addBook] = useMutation(ADD_BOOK);
    
   
    // options that will be dropped onto the author dropdown 
       const mappedOptions = props.authors.map((author)=>{

        return <option value ={author.id} selected  >
            {author.name}
        </option>
       })

    return (
        <div>
           <form onSubmit={(e)=>{
               e.preventDefault()
          
                addBook({variables:{
                    name : bookName,
                    genre: genre,
                    authorId:authorId
                },
                refetchQueries:[{query:getAllBooks}]
                    
                
            })
                setBookName("")
                setAuthorId("")
                setGenre("")


           }} >
           <input type="text" value ={bookName} placeholder ="book name" onChange={(e)=>{

            setBookName(e.target.value)
}} />

            <input type="text" value ={genre} placeholder ="genre name" onChange={(e)=>{
                setGenre(e.target.value)
            }} />
            {
                authorsLoading? "authors":<select  onChange={(e)=>{setAuthorId(e.target.value)}} >
                {mappedOptions}
             </select>
            }
            <button type="submit">Add</button>
           </form>
        </div>
    )
}
