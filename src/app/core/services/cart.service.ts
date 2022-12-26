import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {

  cartCount = new BehaviorSubject(0);

  cartCount$ = this.cartCount.asObservable();

  getCarts() {
    return this.get('cart')
      .pipe(
        tap((carts: any) => {
          this.cartCount.next(carts.length)
        })
      );
  }


  addToCart(payload: {
    productId: string,
    quantity: number
  }) {
    return this.post('cart', payload)
      .pipe(
        tap(() => {
          this.cartCount.next(this.cartCount.value + payload.quantity)
        })
      );
  }

  deleteItem(id: number): Observable<any> {
    return this.delete(`cart/${id}`)
  }

  container!: any;
  dropContainer!: any;
  item!: string;

  checkIfClickedOnContainer = () => {
    if (this.item === 'cart') {
      this.container.nativeElement.classList.remove('visible')
      this.toggleCart = false
    } else if (this.item === 'dropDown') {
      this.dropContainer.nativeElement.classList.remove('visible')
      this.toggleDropDown = false
    }
    document.removeEventListener('click', this.checkIfClickedOnContainer)
  }

  toggleCart: boolean = false;
  toggleDropDown: boolean = false;

  fromDetails() {
    this.toggleCart = true;
  }

  cartToggle(icon: any, container: any, cartIcon: any, item: string) {
    this.item = item;
    if (item === 'cart') {
      this.container = container;
      this.toggleDropDown = false
      this.dropContainer?.nativeElement.classList.remove('visible')
      if (!this.toggleCart) {
        container.nativeElement.classList.add('visible')
        this.toggleCart = true
      } else {
        this.toggleCart = false
        container.nativeElement.classList.remove('visible')
      }
      if (icon !== cartIcon.nativeElement) {
        setTimeout(() => {
          document.addEventListener('click', this.checkIfClickedOnContainer)
        },)
      }
    } else if (item === 'dropDown') {
      this.dropContainer = container;
      this.toggleCart = false
      this.container?.nativeElement.classList.remove('visible')
      if (!this.toggleDropDown) {
        container.nativeElement.classList.add('visible')
        this.toggleDropDown = true
      } else {
        this.toggleDropDown = false
        container.nativeElement.classList.remove('visible')
      }
      if (icon !== cartIcon.nativeElement) {
        setTimeout(() => {
          document.addEventListener('click', this.checkIfClickedOnContainer)
        },)
      }
    }


  }

  entered: boolean = true;

  enter() {
    document.removeEventListener('click', this.checkIfClickedOnContainer)

    if (this.entered) {
      this.entered = false;
    }
  }

  leave(cartContainer: any) {
    if (cartContainer.classList.contains('visible')) {
      document.addEventListener('click', this.checkIfClickedOnContainer)
    }
    this.entered = true;
    if (!this.entered) {
      cartContainer.classList.remove('visible');
    }
  }
}
