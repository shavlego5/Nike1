import {Injectable} from '@angular/core';
import {Product} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor() {
  }

  search(val: string, products: Product[]) {
    let filtered: Product[] = []
    this.products = products;
    this.products.map((prod: any) => {
      if (prod.name.toUpperCase().includes(val.toUpperCase())) {
        filtered.push(prod)
      }
    })
    this.filteredProducts = filtered
  }
}
