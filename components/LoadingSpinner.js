import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { commonStyle } from './CommonStyles';

export const LoadingSpinner = ({ loading }) => {
  if (!loading) return null;

  return (
    <View style={commonStyle.centeredContainer}>
      <ActivityIndicator size="large" color="#4b7bec" />
    </View>
  );
};
