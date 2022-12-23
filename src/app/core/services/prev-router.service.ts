import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrevRouterService {

  prevUrl: string = '/'

  prevRouter(url: string) {
    this.prevUrl = url;
  }
}
