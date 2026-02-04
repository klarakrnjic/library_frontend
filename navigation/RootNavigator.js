import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BooksListScreen from '../screens/BooksListScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import AddEditBookScreen from '../screens/AddEditBookScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardStyle: { backgroundColor: '#F4F4F4' },
      }}
    >
      <Stack.Screen
        name="BooksList"
        component={BooksListScreen}
        options={{ title: 'Knjige' }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{ title: 'Detalji' }}
      />
      <Stack.Screen
        name="AddEditBook"
        component={AddEditBookScreen}
        options={{ title: 'Dodaj/Uredi' }}
      />
    </Stack.Navigator>
  );
}
