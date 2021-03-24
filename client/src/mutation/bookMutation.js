import {gql} from '@apollo/client'

export const removeBook = gql`mutation deleteBook ($id: ID!){

    deleteBook(id: $id){
        id,
        name

    }

}`


export const modifyBook =gql`mutation updateBook($id  :ID!, $updatedBook:BookInputType) {

    updateBook(id:$id,updatedBook:$updatedBook){
        name,
        genre,
        id
    }
}`