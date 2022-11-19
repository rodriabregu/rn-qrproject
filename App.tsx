import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {QRButton} from './src/components/QRButtons';

const App = () => {
  const [QRvalue, setQRValue] = React.useState('');
  const [QRLogo, setQRLogo] = React.useState('');
  const [QRImage, setQRImage] = React.useState('');
  const ref = React.useRef();
  const isDarkMode = useColorScheme() === 'dark';

  console.log('QRvalue', QRvalue.length);

  const isAndroid = Platform.OS === 'android';
  const isIos = Platform.OS === 'ios';

  const GenerateQR = () => {
    ref?.current?.toDataURL((data: string) => {
      setQRImage('data:image/png;base64,' + data);
    });
  };

  const handleSave = async () => {
    if (isAndroid) {
      const isReadGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
        const dirs = RNFetchBlob.fs.dirs;
        const qrcode_data = QRImage.split('data:image/png;base64,');
        const filePath =
          dirs.DownloadDir + '/' + 'QRCode' + new Date().getSeconds() + '.png';
        RNFetchBlob.fs
          .writeFile(filePath, qrcode_data[1], 'base64')
          .then(() => console.log('Saved successfully'))
          .catch(errorMessage =>
            console.log('RNFetchBlob Error in writeFile:', errorMessage),
          );
      }
    }

    if (isIos) {
      const options = {
        title: 'Share is your QRcode',
        url: QRImage,
      };
      try {
        await Share.open(options);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleShare = async () => {
    const options = {
      title: 'Share is your QRcode',
      url: QRImage,
    };
    try {
      await Share.open(options);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Generate QRCode</Text>
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
        <QRCode
          size={350}
          value={QRvalue ? QRvalue : 'NA'}
          logo={{uri: QRLogo}}
          logoSize={60}
          logoBackgroundColor="transparent"
          getRef={ref as any}
        />
        <QRButton
          haveValue={!QRvalue.length}
          GenerateQR={GenerateQR}
          handleSave={handleSave}
          handleShare={handleShare}
        />
      </View>
    </SafeAreaView>
  );
};

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

export default App;
