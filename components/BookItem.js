import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { commonStyle } from './CommonStyles';

export const BookItem = ({ book, onPress, onDelete, onEdit }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[commonStyle.card, styles.bookItem]}>
        {/* Naslov i autor */}
        <View style={styles.headerRow}>
          <View style={styles.headerContent}>
            <Text style={styles.title} numberOfLines={1}>
              {book.title}
            </Text>
            <Text style={styles.author} numberOfLines={1}>
              {book.author}
            </Text>
          </View>

          {/* Status dostupnosti */}
          <View style={[styles.availabilityBadge, book.available ? styles.available : styles.unavailable]}>
            <Text style={styles.availabilityText}>
              {book.available ? 'Dostupna' : 'Nedostupna'}
            </Text>
          </View>
        </View>

        {/* Dodatni podaci */}
        <View style={styles.detailsRow}>
          {book.isbn && (
            <Text style={styles.detailText}>ISBN: {book.isbn}</Text>
          )}
          {book.publishedYear && (
            <Text style={styles.detailText}>{book.publishedYear}</Text>
          )}
        </View>

        {/* Akcije */}
        <View style={[commonStyle.row, styles.actionsRow]}>
          <TouchableOpacity
            style={[commonStyle.button, commonStyle.buttonPrimary, styles.actionBtn]}
            onPress={onEdit}
          >
            <Text style={commonStyle.buttonText}>Uredi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyle.button, commonStyle.buttonDanger, styles.actionBtn]}
            onPress={onDelete}
          >
            <Text style={commonStyle.buttonText}>Obriši</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    padding: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    color: '#666',
  },
  availabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  available: {
    backgroundColor: '#d4f4dd',
  },
  unavailable: {
    backgroundColor: '#ffd4d4',
  },
  availabilityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 12,
    color: '#888',
  },
  actionsRow: {
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 5,
  },
});
