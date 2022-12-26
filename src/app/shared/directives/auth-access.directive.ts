import {AfterViewInit, Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../core/services";

@Directive({
  selector: '[appAuthAccess]'
})
export class AuthAccessDirective implements AfterViewInit {

  constructor(
    private authService: AuthService,
    private template: TemplateRef<any>,
    private container: ViewContainerRef,
  ) {
  }

  ngAfterViewInit() {
    if (!this.authService.token) {
      this.container.clear()
    } else {
      this.container.createEmbeddedView(this.template)
    }
  }
}
