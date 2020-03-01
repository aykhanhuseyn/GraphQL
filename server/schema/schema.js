const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const books = [
  { name: 'Name of the Wind', genre: 'fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'sci-fi', id: '3', authorId: '3' },
  { name: 'The Hero of Ages', genre: 'fantasy', id: '4', authorId: '2' },
  { name: 'The Color of Magic', genre: 'fantasy', id: '5', authorId: '3' },
  { name: 'The Light Fantastic', genre: 'fantasy', id: '6', authorId: '3' },
  { name: 'Blue Angels', genre: 'detective', id: '7', authorId: '4' },
  { name: 'Tahmina & Zaur', genre: 'romance', id: '8', authorId: '5' }
];
const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', genre: 42, id: '2' },
  { name: 'Terry Patchett', genre: 66, id: '3' },
  { name: 'Chingiz Abdullayev', genre: 55, id: '4' },
  { name: 'Anar', genre: 55, id: '5' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLID },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

// book(id:'2'){
//   name
//   genre
// }
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
