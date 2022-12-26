import {Component, ElementRef, Input} from '@angular/core';
import {Product} from "../../core/interfaces";
import {CartService} from "../../core/services";
import {CurrencyService} from "../../core/services/currency.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product: Product = {} as Product;

  @Input('name') name!: string;
  @Input('price') price!: number;
  @Input('imageSrc') imageSrc!: string;
  @Input('description') description!: string;
  @Input('itemID') itemID!: string;
  @Input('category') category!: Object;
  @Input('isInSearchContainer') isInSearchContainer!: boolean;

  @Input('preview') prev!: any;

  @Input('name1') name1?: any;
  @Input('imageSrc1') imageSrc1?: any;
  @Input('price1') price1?: any;

  constructor(
    private cartService: CartService,
    public currency: CurrencyService,
    private router: Router
  ) {
  }

  calculatePrice(price: number): number {
    return Math.floor(price * this.currency.dollarToLari * 100) / 100
  }

  addToCart() {
    this.cartService.addToCart({
      productId: this.product.id,
      quantity: 1
    }).subscribe()
  }

  noRoute(event: any, id: any) {
    event.preventDefault();
    if (!event.target.classList.contains('bi-plus-circle-fill')) {
      this.router.navigate(['/products'], id)
    }
  }
}
