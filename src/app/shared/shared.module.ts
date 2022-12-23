import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthAccessDirective} from './directives/auth-access.directive';
import {SearchContainerDirective} from './directives/search-container.directive';


@NgModule({
  declarations: [
    AuthAccessDirective,
    SearchContainerDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AuthAccessDirective,
    SearchContainerDirective
  ]
})
export class SharedModule {
}
