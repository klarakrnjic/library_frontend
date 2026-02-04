import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import RootNavigator from './navigation/RootNavigator';
import { BookContext } from './context/BookContext';

// Kreiramo globalni kontekst
export const GlobalBookContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  // Globalni state aplikacije
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <GlobalBookContext.Provider value={{ books, setBooks, loading, setLoading, error, setError }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </GlobalBookContext.Provider>
  );
}
