import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import { commonStyle } from '../components/CommonStyles';
import { BookService } from '../services/BookService';

export default function BookDetailsScreen({ route, navigation }) {
  const { book } = route.params || {};
  const [isDeleting, setIsDeleting] = useState(false);

  if (!book) {
    return (
      <View style={commonStyle.container}>
        <Text style={{ color: '#ff6348', fontSize: 14 }}>
          Knjiga nije pronađena
        </Text>
      </View>
    );
  }

  const handleDelete = () => {
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
            setIsDeleting(true);
            try {
              await BookService.deleteBook(book.bookId);
              Alert.alert('Uspjeh', 'Knjiga je obrisana');
              navigation.goBack();
            } catch (err) {
              Alert.alert('Greška', 'Greška pri brisanju knjige');
              console.error(err);
            } finally {
              setIsDeleting(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={commonStyle.container}>
      {/* Naslov */}
      <Text style={commonStyle.headerTitle}>{book.title}</Text>
      <Text style={commonStyle.headerSubtitle}>Detalji knjige</Text>

      {/* Podaci */}
      <View style={commonStyle.card}>
        {/* Autor */}
        <View style={styles.row}>
          <Text style={styles.label}>Autor:</Text>
          <Text style={styles.value}>{book.author}</Text>
        </View>

        {/* ISBN */}
        {book.isbn && (
          <View style={styles.row}>
            <Text style={styles.label}>ISBN:</Text>
            <Text style={styles.value}>{book.isbn}</Text>
          </View>
        )}

        {/* Godina izdanja */}
        {book.publishedYear && (
          <View style={styles.row}>
            <Text style={styles.label}>Godina izdanja:</Text>
            <Text style={styles.value}>{book.publishedYear}</Text>
          </View>
        )}

        {/* Dostupnost */}
        <View style={styles.row}>
          <Text style={styles.label}>Dostupnost:</Text>
          <View
            style={[
              styles.badge,
              book.available ? styles.badgeAvailable : styles.badgeUnavailable,
            ]}
          >
            <Text style={styles.badgeText}>
              {book.available ? 'Dostupna' : 'Nedostupna'}
            </Text>
          </View>
        </View>

        {/* ID */}
        <View style={styles.row}>
          <Text style={styles.label}>ID:</Text>
          <Text style={[styles.value, styles.idText]}>{book.bookId}</Text>
        </View>
      </View>

      {/* Akcije */}
      <TouchableOpacity
        style={[commonStyle.button, commonStyle.buttonPrimary]}
        onPress={() => navigation.navigate('AddEditBook', { book })}
      >
        <Text style={commonStyle.buttonText}>Uredi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[commonStyle.button, commonStyle.buttonDanger, styles.deleteBtn]}
        onPress={handleDelete}
        disabled={isDeleting}
      >
        <Text style={commonStyle.buttonText}>
          {isDeleting ? 'Brisanje...' : 'Obriši'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[commonStyle.button, { backgroundColor: '#95a5a6' }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={commonStyle.buttonText}>Nazad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  idText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeAvailable: {
    backgroundColor: '#d4f4dd',
  },
  badgeUnavailable: {
    backgroundColor: '#ffd4d4',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  deleteBtn: {
    marginTop: 10,
    marginBottom: 10,
  },
});
