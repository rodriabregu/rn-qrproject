import React from 'react';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import QRCode from 'react-native-qrcode-svg';
import {PermissionsAndroid} from 'react-native';

import {QRButtons} from './QRButtons';
import {InputsCapture} from './InputsCapture';
import {isAndroid, isIos} from '../constants';

export function QRHead() {
  const [QRvalue, setQRValue] = React.useState('');
  const [QRLogo, setQRLogo] = React.useState('');
  const [QRImage, setQRImage] = React.useState('');
  const ref = React.useRef();

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

  //Todo: Fix async issue in the haveValue validation (two clicks needed)

  return (
    <>
      <InputsCapture
        QRvalue={QRvalue}
        setQRValue={setQRValue}
        QRLogo={QRLogo}
        setQRLogo={setQRLogo}
      />
      <QRCode
        size={350}
        value={QRvalue ? QRvalue : 'NA'}
        logo={{uri: QRLogo}}
        logoSize={60}
        logoBackgroundColor="transparent"
        getRef={ref as any}
      />
      <QRButtons
        haveValue={!QRImage.length}
        GenerateQR={GenerateQR}
        handleSave={handleSave}
        handleShare={handleShare}
      />
    </>
  );
}
