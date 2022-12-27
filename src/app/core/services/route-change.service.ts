import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteChangeService {

  constructor() {
  }

  route!: string;

  routeChange(route: string) {
    this.route = route
  }
}
