import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {Product} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {

  getProducts(params: {
    categoryId?: number | null,
    limit?: number,
    search?: string,
  }): Observable<Product[]> {
    console.log(this.get<Product[]>('product', params))
    return this.get<Product[]>('product', params)
  }

  getOne(id: string): Observable<Product> {
    console.log(this.get<Product>(`product/${id}`))
    return this.get<Product>(`product/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.post<Product>('product', product);
  }

  update(id: string, product: Product): Observable<Product> {
    return this.put<Product>(`product/${id}`, product);
  }

  deleteItem(id: string): Observable<Product> {
    return this.delete<Product>(`product/${id}`);
  }
}
