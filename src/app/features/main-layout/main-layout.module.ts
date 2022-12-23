import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from "./main-layout.component";
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CartModule} from "../../pages/cart/cart.module";
import {SearchResultComponent} from './components/header/search-result/search-result.component';
import {SharedModule} from "../../shared/shared.module";
import {ProductCardModule} from "../product-card/product-card.module";


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SearchResultComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CartModule,
    SharedModule,
    ProductCardModule
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule {
}
