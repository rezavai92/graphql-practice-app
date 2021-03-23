import React from 'react'
import {getAllBooks} from '../query/bookQuery'
import {getLayoutData} from '../query/layoutQuery'
import {gql,useQuery,useMutation} from '@apollo/client'
import AddBook from './Addbook'
import Booklist from './Booklist'
export default function Layout() {
    const {error,loading,data} = useQuery(getLayoutData)

    

    return (
        <div>

            {loading? null:
            <div>
            <Booklist books={data.books} />
            <AddBook authors={data.authors} />
             </div>
            }
        </div>
    )
}
