import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CartService, OrderService} from "../../core/services";
import {Cart} from "../../core/interfaces/cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {

  @Input() isCheckOutVisible!: boolean;

  cartItems: Cart[] = []
  cartSum = 0
  isLoaded: boolean = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.getCarts()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100)
  }


  getCarts() {
    this.cartService.getCarts()
      .pipe()
      .subscribe(res => {
        this.cartItems = res
        this.cartSum = this.cartItems.reduce((acc, item) => acc + item.total, 0)
      })
  }

  removeItem(item: Cart) {
    this.cartService.deleteItem(item.id)
      .subscribe(() => {
        this.getCarts()
      })
  }

  checkout() {
    this.orderService.createOrder()
      .subscribe(res => {
        this.getCarts()
      })
  }

  // ngOnDestroy(){
  //   this.cartService.getCarts()
  // }
}
