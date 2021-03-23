import {gql} from '@apollo/client'


export const getAllBooks = gql`{

    books:{
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


