import {Component, ElementRef, Input} from '@angular/core';
import {Product} from "../../core/interfaces";
import {CartService} from "../../core/services";
import {CurrencyService} from "../../core/services/currency.service";

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

  constructor(
    private cartService: CartService,
    public currency: CurrencyService
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
}
