import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CartService, ProductsService} from "../../../core/services";
import {Product} from "../../../core/interfaces";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  productId!: string
  product!: Product
  quantity = 1;

  message?: string;

  similarProducts: Product[] = []

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProduct()
    })
  }

  isLoaded: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100)

    this.quantity === 1 ? this.disabled = true : this.disabled = false;
  }


  getProduct() {
    this.productService.getOne(this.productId)
      .pipe()
      .subscribe((product) => {
        this.product = product;
        this.getProducts()
      })
  }

  clicked = true;

  addToCart() {
    this.cartService.addToCart({
      productId: this.productId,
      quantity: this.quantity
    })
      .pipe()
      .subscribe(() => {
        if (this.clicked) {
          document.getElementById('cartContainer')?.classList.add('visible')
          this.clicked = false;
        }
        setTimeout(() => {
          if (this.cartService.entered) {
            document.getElementById('cartContainer')?.classList.remove('visible')
            this.clicked = true;
          }
        }, 3000)
      })
  }

  getProducts() {
    this.productService.getProducts({
      limit: 4,
      categoryId: this.product.category.id,
      similar: this.product.id
    })
      .pipe()
      .subscribe((products) => {
        this.similarProducts = products
      })
  }

  increment() {
    this.quantity++
    if (this.quantity > 1) {
      this.disabled = false
    }
  }

  @ViewChild('decrements') decrements?: ElementRef;

  disabled: boolean = false;

  decrement() {
    this.quantity--;
    if (this.quantity === 1) {
      this.disabled = true
    } else {
      this.disabled = false
    }
  }
}
