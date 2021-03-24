import {gql} from '@apollo/client'


export const getAllBooks = gql`{

    books{
        name,
        id,
        genre,
        author{
            id
            name
            age
        }
    }
}`


export const getBook =gql`query book($id : ID!){

    book(id:$id){
        id,
        name,
        genre
        author{
            id,
            name,
            age,
            books{
                name
                
            }
        }
    }
}`