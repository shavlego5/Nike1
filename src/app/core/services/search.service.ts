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
    console.log(this.products)
    this.products.map((prod: any) => {
      if (prod.name.includes(val)) {
        filtered.push(prod)
      }
    })
    this.filteredProducts = filtered
    console.log(this.filteredProducts)
  }
}
