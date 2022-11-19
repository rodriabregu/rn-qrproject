import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export function QRButtons({
  haveValue,
  GenerateQR,
  handleSave,
  handleShare,
}: {
  haveValue: boolean;
  GenerateQR: () => void;
  handleSave: () => Promise<void>;
  handleShare: () => Promise<void>;
}) {
  return (
    <>
      <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.newButton} onPress={() => GenerateQR()}>
          <Text style={[styles.sectionDescription, styles.sectionColor]}>
            Generate QR
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          disabled={haveValue}
          style={haveValue ? styles.ButtonDisabled : styles.Button}
          onPress={() => handleShare()}>
          <Text style={[styles.sectionDescription, styles.sectionColor]}>
            Share QR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={haveValue}
          style={haveValue ? styles.ButtonDisabled : styles.Button}
          onPress={() => handleSave()}>
          <Text style={[styles.sectionDescription, styles.sectionColor]}>
            Save QR
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  sectionColor: {
    color: '#fff',
    fontWeight: '900',
  },
  newButton: {
    backgroundColor: 'deepskyblue',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 75,
    borderRadius: 20,
    paddingBottom: 17,
  },
  Button: {
    backgroundColor: 'deepskyblue',
    marginTop: 32,
    marginRight: 50,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    paddingBottom: 17,
  },
  ButtonDisabled: {
    backgroundColor: 'darkgrey',
    marginTop: 32,
    marginRight: 50,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    paddingBottom: 17,
  },
});
