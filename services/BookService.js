import apiClient from '../config/ApiClient';

export const BookService = {
  // Dohvati sve knjige
  getAllBooks: async () => {
    try {
      const response = await apiClient.get('');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Dohvati knjige sa paginacijom
  getBooksByPage: async (page = 0, size = 10) => {
    try {
      const response = await apiClient.get(`?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Dohvati pojedinačnu knjigu
  getBookById: async (bookId) => {
    try {
      const response = await apiClient.get(`/${bookId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Kreiraj novu knjigu
  createBook: async (bookData) => {
    try {
      const response = await apiClient.post('', bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ažuriraj postojeću knjigu
  updateBook: async (bookId, bookData) => {
    try {
      const response = await apiClient.put(`/${bookId}`, bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obriši knjigu
  deleteBook: async (bookId) => {
    try {
      const response = await apiClient.delete(`/${bookId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
