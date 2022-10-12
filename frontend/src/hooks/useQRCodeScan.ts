import {useState, useRef} from "react";
import {Html5Qrcode} from "html5-qrcode";

export default function useQRCodeScan({
                                        qrcodeMountNodeID = "",
                                        closeAfterScan = true,
                                        qrCodeScannerDimension,
                                      }: {
  qrcodeMountNodeID?: string;
  closeAfterScan?: boolean;
  qrCodeScannerDimension: { width: number; height: number };
}) {
  const [decodedQRData, setDecodedQrData] = useState<{
    isScanning: boolean;
    isScanSuccess: boolean;
    isScanFailure: boolean;
    data: string | null;
    error: any | null;
  }>({
    isScanning: false,
    isScanSuccess: false,
    isScanFailure: false,
    data: null,
    error: null,
  });
  const html5QrCodeScannerRef = useRef<Html5Qrcode | null>(null);


  function stopQrCode() {
    console.log("at stop: ", html5QrCodeScannerRef.current, decodedQRData.isScanning)
    if (html5QrCodeScannerRef.current && decodedQRData.isScanning) {
      console.log("stop runs")
      html5QrCodeScannerRef.current
        ?.stop()
        ?.then((ignore) => {
          // QR Code scanning is stopped
          console.log("stopped after successful scan");
        })
        ?.catch((err) => {
          // Stop failed, handle it.
          console.log("fails to stop after successful scan result ");
        });

      html5QrCodeScannerRef.current = null;
      setDecodedQrData({
        ...decodedQRData,
        isScanning: false,
      });
    }
  }

  function startQrCode() {

    try {
      setDecodedQrData({
        ...decodedQRData,
        isScanning: true,
        data: null,
      });
      // eslint-disable-next-line
      const html5qrCodeScanner = new Html5Qrcode(qrcodeMountNodeID, {
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
        verbose: true,
      });

      html5QrCodeScannerRef.current = html5qrCodeScanner;

      html5qrCodeScanner
        .start(
          // { deviceId: { exact: cameraId } },
          {facingMode: "environment"},

          {fps: 10, qrbox: qrCodeScannerDimension},
          (qrCodeMessage) => {
            // do something when code is read
            window.alert(`scanned qr code, ${qrCodeMessage}`);

            setDecodedQrData({
              ...decodedQRData,
              isScanSuccess: true,
              isScanning: false,
              data: qrCodeMessage,
              error: "",
            });

            if (closeAfterScan) {
              html5qrCodeScanner
                .stop()
                .then((ignore) => {
                  // QR Code scanning is stopped.
                  // setIsOpenCamera(false);
                  console.log("stopped after successful scan");
                })
                .catch((err) => {
                  // Stop failed, handle it.
                  console.log("fails to stop after succesfull scan result ");
                });
            }
          },
          (errorMessage) => {
          }
        )
        .catch((err) => {
          setDecodedQrData({
            ...decodedQRData,
            isScanSuccess: false,
            isScanning: false,
            isScanFailure: true,
            data: null,
            error: err || "QR Code parsing failed",
          });
        });
    } catch (e) {
      setDecodedQrData({
        ...decodedQRData,
        isScanSuccess: false,
        isScanning: false,
        isScanFailure: true,
        data: null,
        error: e || "QR Code parsing failed",
      });
    }
  }

  return {
    startQrCode,
    decodedQRData,
    stopQrCode,
  };
}
