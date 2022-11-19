import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export function InputsCapture({
  QRvalue,
  setQRValue,
  QRLogo,
  setQRLogo,
}: {
  QRvalue: string;
  setQRValue: (value: string) => void;
  QRLogo: string;
  setQRLogo: (value: string) => void;
}) {
  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Add Value to QRCode"
        style={styles.textInput}
        autoCapitalize="none"
        value={QRvalue}
        onChangeText={setQRValue}
      />
      <TextInput
        placeholder="Add Logo URL"
        style={styles.textInput}
        autoCapitalize="none"
        value={QRLogo}
        onChangeText={setQRLogo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginRight: 20,
    marginVertical: 20,
    borderRadius: 20,
    width: 162,
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
