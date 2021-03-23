import React,{useState} from 'react'
import {gql,useMutation,useQuery} from '@apollo/client'
export default function Addbook() {

    const [bookName,setBookName] = useState("")
    const [genre,setGenre] = useState("")
    const [authorId,setAuthorId] = useState("")

    
console.log("author id is",authorId)

    const ADD_BOOK=gql`
       mutation addBook($name:String!,$genre:String!,$authorId:String!){

        addBook(name:$name,genre:$genre,authorId:$authorId){
            name,
            genre
        }
       }
          
    `
    const getAuthors=gql`{

        authors{
            id
            name
        }
    }`
    const {data : authors,loading:authorsLoading,error} = useQuery(getAuthors)

    console.log("authors are ",authors)
    const [addBook] = useMutation(ADD_BOOK);
    
   
    
       const mappedOptions = !authorsLoading ?authors.authors.map((a)=>{
        return <option value={a.id}   >
                 {a.name}
        </option>
    }) : null
    

    return (
        <div>
           <form onSubmit={(e)=>{
               e.preventDefault()
          
                addBook({variables:{
                    name : bookName,
                    genre: genre,
                    authorId:authorId
                }})
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
