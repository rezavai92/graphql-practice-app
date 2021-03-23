
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


