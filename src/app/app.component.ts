import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {RouteChangeService} from "./core/services/route-change.service";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(private router: Router, private routeChange: RouteChangeService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.routeChange.routeChange(event.url)
      }
    });
  }
}
