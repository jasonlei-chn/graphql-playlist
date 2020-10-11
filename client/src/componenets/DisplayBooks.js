import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";

function DisplayBooks() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>`Error! ${error.message}`</p>;
  }

  return data.books.map((book) => {
    return <li key={book.id}>{book.name}</li>;
  });
}

export default DisplayBooks;
