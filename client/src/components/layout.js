import React from 'react'
import {getAllBooks} from '../query/bookQuery'
import {getLayoutData} from '../query/layoutQuery'
import {gql,useQuery,useMutation} from '@apollo/client'
import AddBook from './Addbook'
import Booklist from './Booklist'
import "./layout.css"
export default function Layout() {
    const {error,loading,data} = useQuery(getLayoutData)

    
console.log(data)
    return (
        <div>

            {loading? null:
            <div >
                <div className="booklist-layout" >
                <Booklist books={data.books}  authors ={data.authors} />
                </div>
            <AddBook authors={data.authors} />
             </div>
            }
        </div>
    )
}
