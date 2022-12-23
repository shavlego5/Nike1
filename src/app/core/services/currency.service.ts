import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency: string = '$';
  dollarToLari: number = 1;

  setCurrency() {
    this.currency === '₾' ? (this.currency = '$', this.dollarToLari = 1) : (this.currency = '₾', this.dollarToLari = 2.67)
  }
}
