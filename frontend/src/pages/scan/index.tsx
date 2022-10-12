import React, { useEffect } from "react";

import useQRCodeScan from "../../hooks/useQRCodeScan";
import Scanner from "../../components/Scanner";

export default function Scan() {
  // const { startQrCode, decodedQRData, stopQrCode } = useQRCodeScan({
  //   qrcodeMountNodeID: "qrcode-scanner",
  //   qrCodeScannerDimension: { width: 400, height: 400 },
  // });
  //
  // useEffect(() => {startQrCode(); return stopQrCode}, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <h1 className="text-4xl font-bold">Scan</h1>
          {/*<div id="qrcode-scanner" className={"w-120"}></div>*/}
          <Scanner id="qrcode-scanner"/>
        </div>
      </div>
    </div>
  );
}
