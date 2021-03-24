import {gql} from '@apollo/client'

export const getLayoutData = gql`
{


    authors{
        name
        id
    }

    books{
        id
        name
        genre
        author{
            id
            name
        }
    }

}
`

