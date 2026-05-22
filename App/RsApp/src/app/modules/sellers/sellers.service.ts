import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  constructor() { }

  saveSeller(sellerData: any): Observable<any> {
    const storedSeller = {
      ...sellerData,
      sellerImage: sellerData.sellerImage?.name || null,
      cnicFront: sellerData.cnicFront?.name || null,
      cnicBack: sellerData.cnicBack?.name || null,
      savedAt: new Date().toISOString()
    };

    const sellers = JSON.parse(localStorage.getItem('sellers') || '[]');
    sellers.push(storedSeller);
    localStorage.setItem('sellers', JSON.stringify(sellers));

    return of({ success: true, seller: storedSeller });
  }

  getSellers(): any[] {
    return JSON.parse(localStorage.getItem('sellers') || '[]');
  }
}
