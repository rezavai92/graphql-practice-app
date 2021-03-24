
import {gql} from '@apollo/client'

export const getDropDownAuthors =gql`{

    authors{
        id
        name
    }
}`


export const getAllAuthors = gql`{
    authors{
        id
        name
        age
        books
    }
} `

export const getAuthor = gql`query author($id:ID!){
        author(id:$id){
            name,
            id,
            age
        }
}`

