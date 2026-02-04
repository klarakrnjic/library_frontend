export const validateBook = (book) => {
  const errors = {};

  // Naslov
  if (!book.title || book.title.trim() === '') {
    errors.title = 'Naslov je obavezan';
  } else if (book.title.length < 2) {
    errors.title = 'Naslov mora sadržavati najmanje 2 znaka';
  } else if (book.title.length > 200) {
    errors.title = 'Naslov može sadržavati maksimalno 200 znakova';
  }

  // Autor
  if (!book.author || book.author.trim() === '') {
    errors.author = 'Autor je obavezan';
  } else if (book.author.length < 2) {
    errors.author = 'Autor mora sadržavati najmanje 2 znaka';
  } else if (book.author.length > 200) {
    errors.author = 'Autor može sadržavati maksimalno 200 znakova';
  }

  // ISBN (opcionalno, ali ako postoji mora biti validan)
  if (book.isbn && book.isbn.trim() !== '') {
    const isbnRegex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?:(?=(?:[0-9]+[- ]){3})[0-9X]{13}$)|(?:97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[0-9X]{17}$))(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
    if (!isbnRegex.test(book.isbn.replace(/[- ]/g, ''))) {
      errors.isbn = 'Nevažeći ISBN format';
    }
  }

  // Godina izdanja (opcionalno, ali ako postoji mora biti validan)
  if (book.publishedYear && book.publishedYear !== '') {
    const year = parseInt(book.publishedYear);
    if (isNaN(year)) {
      errors.publishedYear = 'Godina mora biti broj';
    } else if (year < 1000 || year > new Date().getFullYear()) {
      errors.publishedYear = `Godina mora biti između 1000 i ${new Date().getFullYear()}`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
