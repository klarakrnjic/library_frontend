import React, { createContext } from 'react';

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [books, setBooks] = React.useState([]);
  const [selectedBook, setSelectedBook] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const value = {
    books,
    setBooks,
    selectedBook,
    setSelectedBook,
    loading,
    setLoading,
    error,
    setError,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
