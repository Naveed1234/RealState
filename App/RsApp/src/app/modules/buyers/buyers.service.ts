import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {

  constructor() { }

  saveBuyer(buyerData: any): Observable<any> {
    const storedBuyer = {
      ...buyerData,
      buyerImage: buyerData.buyerImage?.url || buyerData.buyerImage || null,
      buyerImageName: buyerData.buyerImage?.name || null,
      cnicFront: buyerData.cnicFront?.url || buyerData.cnicFront || null,
      cnicFrontName: buyerData.cnicFront?.name || null,
      cnicBack: buyerData.cnicBack?.url || buyerData.cnicBack || null,
      cnicBackName: buyerData.cnicBack?.name || null,
      savedAt: new Date().toISOString()
    };

    const buyers = JSON.parse(localStorage.getItem('buyers') || '[]');
    buyers.push(storedBuyer);
    localStorage.setItem('buyers', JSON.stringify(buyers));

    return of({ success: true, buyer: storedBuyer });
  }

  getBuyers(): any[] {
    const storedBuyers = JSON.parse(localStorage.getItem('buyers') || '[]');
    if (storedBuyers && storedBuyers.length) {
      return storedBuyers;
    }

    const dummyBuyers = [
      {
        buyerName: 'Ahsan Khan',
        mobileNumber: '0300-1234567',
        cnicNumber: '35202-1234567-1',
        plotLocation: 'Block A',
        plotSize: '10 Marla',
        pricePerMarla: '6,000,000',
        totalAmount: '60,000,000',
        payment: 'Paid',
        bankName: 'UBL',
        accountNumber: '123456789012',
        buyerImage: 'https://via.placeholder.com/700x420?text=Buyer+Image',
        cnicFront: 'https://via.placeholder.com/250x160?text=CNIC+Front',
        cnicBack: 'https://via.placeholder.com/250x160?text=CNIC+Back'
      },
      {
        buyerName: 'Sara Ali',
        mobileNumber: '0312-7654321',
        cnicNumber: '35202-7654321-2',
        plotLocation: 'Block B',
        plotSize: '5 Marla',
        pricePerMarla: '7,200,000',
        totalAmount: '36,000,000',
        payment: 'Installment',
        bankName: 'MCB',
        accountNumber: '987654321098',
        buyerImage: 'https://via.placeholder.com/700x420?text=Buyer+Image',
        cnicFront: 'https://via.placeholder.com/250x160?text=CNIC+Front',
        cnicBack: 'https://via.placeholder.com/250x160?text=CNIC+Back'
      },
      {
        buyerName: 'Bilal Ahmed',
        mobileNumber: '0301-1122334',
        cnicNumber: '35202-1122334-3',
        plotLocation: 'Block C',
        plotSize: '8 Marla',
        pricePerMarla: '6,500,000',
        totalAmount: '52,000,000',
        payment: 'Advance',
        bankName: 'HBL',
        accountNumber: '456789123456',
        buyerImage: 'https://via.placeholder.com/700x420?text=Buyer+Image',
        cnicFront: 'https://via.placeholder.com/250x160?text=CNIC+Front',
        cnicBack: 'https://via.placeholder.com/250x160?text=CNIC+Back'
      }
    ];

    localStorage.setItem('buyers', JSON.stringify(dummyBuyers));
    return dummyBuyers;
  }
}
