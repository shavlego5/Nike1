import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {ProductCardModule} from "../../features/product-card/product-card.module";
import {SvgAnimationComponent} from './svg-animation/svg-animation.component';


@NgModule({
  declarations: [
    HomeComponent,
    SvgAnimationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductCardModule
  ]
})
export class HomeModule {
}
