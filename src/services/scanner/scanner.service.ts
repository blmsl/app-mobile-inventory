import { Injectable } from '@angular/core';
/* Services. */
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Injectable()
export class ScannerService {
    private options: BarcodeScannerOptions;

    constructor(private barcodeScanner: BarcodeScanner ) {
    }

    scann(prompt: string) {
        this.options = {
            prompt: prompt
        };
        return this.barcodeScanner.scan(this.options);
    }

    encode(data: any) {
        var textData = JSON.stringify(data);
        console.log(textData);
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, textData);
    }

}
