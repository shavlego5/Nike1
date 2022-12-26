import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductsService} from "../../core/services";
import {Category, Product} from "../../core/interfaces";
import {CategoryService} from "../../core/services/category.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  isLoaded: boolean = false;
  products: Product[] = []
  categoryId?: number

  categories$: Observable<Category[]> = this.categoryService.getAll()
  search: any;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['category']
      this.search = params['search']
      this.getProducts()
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100)
  }


  getProducts() {
    const params = {
      categoryId: this.categoryId || null,
      search: this.search || null
    }
    this.productService.getProducts(params)
      .pipe()
      .subscribe(res => {
        this.products = res
      })
  }

  searchHandle(search: string) {

    if (search.length > 2) {
      this.search = search
      this.getProducts()
    } else {
      this.search = null
      this.getProducts()
    }

  }
}
