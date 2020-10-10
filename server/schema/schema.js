const graphql = require("graphql");
// const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "BookType description",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genere: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "AuthorType description",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "RootQueryType description",
  fields: {
    book: {
      type: BookType,
      description: "Query a book given its id",
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        // return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      description: "Query an author given its id",
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        // return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return Author(args).save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genere: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Book(args).save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
