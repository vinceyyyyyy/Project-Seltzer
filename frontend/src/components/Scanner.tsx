import React, {useEffect} from 'react';
import {Html5QrcodeScanner, Html5QrcodeScanType} from "html5-qrcode";

export default function Scanner(props:{ id: string}) {
  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(props.id, {
      fps: 10,
      qrbox: {width: 250, height: 250},
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    }, true);

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return function cleanup() {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    }
  }, []);

  return <div id={props.id}/>;
}


function onScanSuccess(decodedText: string, decodedResult: any) {
  // handle the scanned code as you like, for example:
  window.alert(`Code matched = ${decodedText}`);
  console.log("Scan result = ", decodedResult);
}

function onScanFailure(error: string) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.log(`Code scan error = ${error}`);
}
