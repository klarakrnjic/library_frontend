import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';

import { GlobalBookContext } from '../App';
import { BookService } from '../services/BookService';
import { commonStyle } from '../components/CommonStyles';
import { validateBook } from '../utils/ValidationUtils';

export default function AddEditBookScreen({ route, navigation }) {
  const { books, setBooks } = useContext(GlobalBookContext);
  const editingBook = route.params?.book;

  // Lokalni state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [available, setAvailable] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Učitaj podatke ako se uređuje knjiga
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title || '');
      setAuthor(editingBook.author || '');
      setIsbn(editingBook.isbn || '');
      setPublishedYear(editingBook.publishedYear?.toString() || '');
      setAvailable(editingBook.available !== false);
    }
  }, [editingBook]);

  const handleSaveBook = async () => {
    // Validiraj podatke
    const validation = validateBook({ title, author, isbn, publishedYear, available });
    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert('Greška pri validaciji', 'Molimo popunite obavezna polja ispravno');
      return;
    }

    setIsLoading(true);
    try {
      const bookData = {
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim() || null,
        publishedYear: publishedYear ? parseInt(publishedYear) : null,
        available,
      };

      if (editingBook) {
        // Ažuriranje
        const updatedBook = await BookService.updateBook(editingBook.bookId, bookData);
        const updatedBooks = books.map(b => b.bookId === updatedBook.bookId ? updatedBook : b);
        setBooks(updatedBooks);
        Alert.alert('Uspjeh', 'Knjiga je uspješno ažurirana');
      } else {
        // Kreiranje
        const newBook = await BookService.createBook(bookData);
        setBooks([...books, newBook]);
        Alert.alert('Uspjeh', 'Knjiga je uspješno dodana');
      }

      navigation.goBack();
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.errors?.[0]?.msg || 'Greška pri spremanju knjige';
      Alert.alert('Greška', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={commonStyle.container}>
      {/* Header */}
      <Text style={commonStyle.headerTitle}>
        {editingBook ? 'Uredi knihu' : 'Dodaj novu knjigu'}
      </Text>
      <Text style={commonStyle.headerSubtitle}>
        {editingBook ? 'Promijenite podatke i spremite' : 'Ispunite podatke o knjizi'}
      </Text>

      {/* Forma */}
      <View style={commonStyle.card}>
        {/* Naslov */}
        <Text style={commonStyle.label}>Naslov *</Text>
        <TextInput
          placeholder="Unesite naslov knjige"
          style={[
            commonStyle.input,
            errors.title && styles.inputError,
          ]}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (errors.title) setErrors({ ...errors, title: null });
          }}
          editable={!isLoading}
        />
        {errors.title && (
          <Text style={commonStyle.errorText}>{errors.title}</Text>
        )}

        {/* Autor */}
        <Text style={commonStyle.label}>Autor *</Text>
        <TextInput
          placeholder="Unesite autora knjige"
          style={[
            commonStyle.input,
            errors.author && styles.inputError,
          ]}
          value={author}
          onChangeText={(text) => {
            setAuthor(text);
            if (errors.author) setErrors({ ...errors, author: null });
          }}
          editable={!isLoading}
        />
        {errors.author && (
          <Text style={commonStyle.errorText}>{errors.author}</Text>
        )}

        {/* ISBN */}
        <Text style={commonStyle.label}>ISBN</Text>
        <TextInput
          placeholder="Unesite ISBN broj (opcionalno)"
          style={[
            commonStyle.input,
            errors.isbn && styles.inputError,
          ]}
          value={isbn}
          onChangeText={(text) => {
            setIsbn(text);
            if (errors.isbn) setErrors({ ...errors, isbn: null });
          }}
          editable={!isLoading}
        />
        {errors.isbn && (
          <Text style={commonStyle.errorText}>{errors.isbn}</Text>
        )}

        {/* Godina izdanja */}
        <Text style={commonStyle.label}>Godina izdanja</Text>
        <TextInput
          placeholder="Unesite godinu izdanja (opcionalno)"
          style={[
            commonStyle.input,
            errors.publishedYear && styles.inputError,
          ]}
          value={publishedYear}
          onChangeText={(text) => {
            setPublishedYear(text);
            if (errors.publishedYear) setErrors({ ...errors, publishedYear: null });
          }}
          keyboardType="numeric"
          editable={!isLoading}
        />
        {errors.publishedYear && (
          <Text style={commonStyle.errorText}>{errors.publishedYear}</Text>
        )}

        {/* Dostupnost */}
        <View style={styles.availabilityRow}>
          <Text style={commonStyle.label}>Dostupna je u knjižnici</Text>
          <Switch
            value={available}
            onValueChange={setAvailable}
            disabled={isLoading}
            trackColor={{ false: '#d4d4d4', true: '#81c784' }}
            thumbColor={available ? '#4caf50' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Gumbi */}
      <TouchableOpacity
        style={[
          commonStyle.button,
          commonStyle.buttonSuccess,
          isLoading && styles.buttonDisabled,
        ]}
        onPress={handleSaveBook}
        disabled={isLoading}
      >
        <Text style={commonStyle.buttonText}>
          {isLoading ? 'Spremanje...' : editingBook ? 'Ažuriraj' : 'Dodaj'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[commonStyle.button, { backgroundColor: '#95a5a6' }]}
        onPress={() => navigation.goBack()}
        disabled={isLoading}
      >
        <Text style={commonStyle.buttonText}>Otkaži</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputError: {
    borderColor: '#ff6348',
    borderWidth: 1.5,
  },
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
