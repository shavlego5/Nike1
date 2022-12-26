import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrevRouterService {

  prevUrl: string = '/'

  prevRouter(url: string) {
    if (url === '/auth/register') {
      this.prevUrl = '/';
    } else {
      this.prevUrl = url;
    }
  }
}
