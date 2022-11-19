import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {QRHead} from './src/components/QRHead';

function App() {
  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Generate QRCode</Text>
        <QRHead />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
