const graphql = require('graphql')
const _ = require('lodash')

const Book = require('./models/book')
const Author = require('./models/author')
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList} = graphql



// const authors = [
//     {
//         id : "1",
//         name : "Haruki Murakami",
//         age : 65
//     },
//     {
//         id : "2",
//         name : "Akhtaruzzaman Eliyas",
//         age : 55
//     },
//     {
//         id : "3",
//          name : "Sunil Ganguly",
//          age : 50
//     }
// ]


// const books =[
//     {
//     id : "1",
//     name : "Man without Woman",
//     genre : "Romantic",
//     authorId : "1"
// },
// {
//     id : "2",
//     name : "Kafka On The Shore",
//     genre : "fiction",
//     authorId : "1"
// },
// {
//     id : "3",
//     name : "Sei Somoy",
//     genre : "fiction",
//     authorId : "3"
// },
// { 
//     id : "4",
//     name : "Payer Tolai Shorshe",
//     genre : "travel",
//     authorId : "3"

// },
//  {
// id : "5",
// name : "Khowab Nama",
// genre : "Fiction",
// authorId : "2"

// }
// ]

const BookType = new GraphQLObjectType({

    name : "Book",
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent,args){
               return  Author.findById(parent.authorId)

               
            }
        }


        
    })
}


);

const AuthorType  = new GraphQLObjectType({
    name : 'Author',
    fields : ()=>({
        id : {
            type : GraphQLID
        },
        name :{
            type : GraphQLString
        },
        age :{
            type : GraphQLInt
        },
        books :{
            type : new GraphQLList(BookType),
            resolve (parent,args){
                return Book.find({
                    authorId : parent.id
                })
             
            }

        }

    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : { id :{
                type  : GraphQLID
            }},
            resolve (parent,args){
                return Book.findById(args.id)
               
            }
        },

        author:{
            type : AuthorType,
            args :{
                id : {
                    type : GraphQLID
                }
            },
            resolve(parent,args){
               return Author.findById(args.id)
            }
        },

        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){

               return Book.find()
            }
        }
        ,

        authors :{
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
               return Author.find()
            }
        }
       
            
            
    }
})

const Mutation = new GraphQLObjectType({

    name : "Mutation",
    fields:{
        // it will create a new book to the collection
        addBook :{
            type : BookType,
            args :{
                name :{
                    type : GraphQLString,

                },
                genre :{
                    type : GraphQLString
                },

                authorId : {
                    type : GraphQLString
                }


            },
            resolve (parent,args){

               const b= new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                })

                return b.save()
            }
        },

        addAuthor :{
            type : AuthorType,
            args:{
                name:{
                    type : GraphQLString
                },
                age :{
                    type : GraphQLInt
                }
            },

            resolve (parent,args){

                    const a = new Author({
                        name : args.name,
                        age : args.age
                    })

                    return a.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})