import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService, CartService, ProductsService} from "../../../../core/services";
import {Observable, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {LangService} from "../../../../core/services";
import {CurrencyService} from "../../../../core/services/currency.service";
import {PrevRouterService} from "../../../../core/services/prev-router.service";
import {SearchService} from "../../../../core/services/search.service";
import {Product} from "../../../../core/interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount$: Observable<number> = this.cartService.cartCount$;
  searchInput: any;

  @ViewChild('dropDownIcon') dropDownIcon!: ElementRef;
  @ViewChild('dropDownContainer') dropDownContainer!: ElementRef;
  @ViewChild('cartIcon') cartIcon!: ElementRef;
  @ViewChild('cartContainer') cartContainer!: ElementRef;

  get userIsAuthenticated() {
    return this.authService.token
  }

  get user() {
    return this.authService.user
  }

  constructor(
    private authService: AuthService,
    public cartService: CartService,
    private router: Router,
    public lang: LangService,
    public currency: CurrencyService,
    private prevUrl: PrevRouterService,
    public searchService: SearchService,
    private productsService: ProductsService,
  ) {
  }

  ngOnInit(): void {
    this.getProducts()
  }


  signOut() {
    this.authService.signOut()

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url])
  }


  search(event: any) {
    if (event.key == "Enter") {
      this.router.navigate(['/products'], {queryParams: {search: event}})  //.then()
    }
  }

  changeLang(event: any) {
    event.currentTarget.style.transform = this.lang.deg;
    this.lang.changeLang();
  }

  cartToggle(event: MouseEvent, item: string) {
    if (item === 'cart') {
      this.cartService.cartToggle(event.currentTarget, this.cartContainer, this.cartIcon, item)
    } else if (item === 'dropDown') {
      this.cartService.cartToggle(event.currentTarget, this.dropDownContainer, this.dropDownIcon, item)
    }
  }

  enter() {
    this.cartService.enter()
  }

  leave(cartContainer: any) {
    this.cartService.leave(cartContainer)
  }

  prevRouter() {
    this.prevUrl.prevRouter(this.router.url)
  }

  inputValueLength: number = 0;
  val: string = '';

  searchHandle(val: string) {
    this.inputValueLength = val.length;
    this.val = val;
    this.searchService.search(val, this.products)
  }

  products: Product[] = []

  sub$ = new Subject()

  getProducts() {
    this.productsService.getProducts({})
      .pipe(takeUntil(this.sub$))
      .subscribe((products) => {
        this.products = products
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
