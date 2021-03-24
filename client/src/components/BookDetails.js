import React from 'react'

export default function BookDetails({bookDetails}) {

  console.log(bookDetails)
    return (
        <div>
            <h1>Book details</h1>
            <div>
                <p> <span><h5>Book Name :</h5></span> {bookDetails.bookName}</p>
                <p> <span><h5> Genre :</h5></span>  {bookDetails.genre}</p>
                <p> <span><h5> Author : </h5></span>  {bookDetails.authorName}</p>
                <p> <span><h5>Other Books of this author : </h5></span>  {bookDetails.otherBooksOfThisAuthor.map((b)=>{
                    return(<p>
                            {b.name}
                        </p>)
                })}</p>
               
            </div>
        </div>
    )
}
