import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products.component';
import {ProductAddEditComponent} from './product-add-edit/product-add-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {ProductCardModule} from "../../../../features/product-card/product-card.module";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductAddEditComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    ProductCardModule
  ]
})
export class ProductsModule {
}
