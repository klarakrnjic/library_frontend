import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { GlobalBookContext } from '../App';
import { BookService } from '../services/BookService';
import { commonStyle } from '../components/CommonStyles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BookItem } from '../components/BookItem';

export default function BooksListScreen({ navigation }) {
  const { books, setBooks, loading, setLoading, error, setError } =
    useContext(GlobalBookContext);

  // Učitaj knjige na početku ekrana
  useFocusEffect(
    React.useCallback(() => {
      fetchBooks();
    }, [])
  );

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await BookService.getAllBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Greška pri učitavanju knjiga');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = (book) => {
    Alert.alert(
      'Potvrda brisanja',
      `Sigurno želite obrisati "${book.title}"?`,
      [
        {
          text: 'Otkaži',
          style: 'cancel',
        },
        {
          text: 'Obriši',
          onPress: async () => {
            try {
              await BookService.deleteBook(book.bookId);
              setBooks(books.filter(b => b.bookId !== book.bookId));
              Alert.alert('Uspjeh', 'Knjiga je obrisana');
            } catch (err) {
              Alert.alert('Greška', 'Greška pri brisanju knjige');
              console.error(err);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleViewBook = (book) => {
    navigation.navigate('BookDetails', { book });
  };

  const handleEditBook = (book) => {
    navigation.navigate('AddEditBook', { book });
  };

  const renderItem = ({ item }) => (
    <BookItem
      book={item}
      onPress={() => handleViewBook(item)}
      onDelete={() => handleDeleteBook(item)}
      onEdit={() => handleEditBook(item)}
    />
  );

  const renderEmptyList = () => (
    <View style={commonStyle.centeredContainer}>
      <Text style={styles.emptyText}>Nema knjiga u knjižnici</Text>
      <TouchableOpacity
        style={[commonStyle.button, commonStyle.buttonSuccess, styles.addButton]}
        onPress={() => navigation.navigate('AddEditBook')}
      >
        <Text style={commonStyle.buttonText}>+ Dodaj prvu knjigu</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={commonStyle.container}>
      {/* Header */}
      <Text style={commonStyle.headerTitle}>Knjige u knjižnici</Text>
      <Text style={commonStyle.headerSubtitle}>
        Ukupno knjiga: {books.length}
      </Text>

      {/* Error poruka */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity onPress={fetchBooks}>
            <Text style={styles.retryText}>Pokušaj ponovno</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Loading */}
      {loading && <LoadingSpinner loading={true} />}

      {/* Lista knjiga */}
      {!loading && (
        <>
          <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={item => item.bookId}
            ListEmptyComponent={renderEmptyList}
            onEndReachedThreshold={0.1}
            scrollEventThrottle={16}
          />

          {/* FAB gumb za dodavanje */}
          {books.length > 0 && (
            <TouchableOpacity
              style={[commonStyle.button, commonStyle.buttonSuccess, styles.fab]}
              onPress={() => navigation.navigate('AddEditBook')}
            >
              <Text style={commonStyle.buttonText}>+ Dodaj</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6348',
  },
  errorMessage: {
    color: '#d32f2f',
    fontSize: 13,
    marginBottom: 8,
  },
  retryText: {
    color: '#4b7bec',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
