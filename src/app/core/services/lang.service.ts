import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  lang: string = 'eng';
  deg: string = 'rotateX(180deg)';

  changeLang() {
    setTimeout(() => {
      console.log(this.lang)
      return this.lang === 'eng' ? (this.lang = 'geo', this.deg = 'rotateX(0deg)') : (this.lang = 'eng', this.deg = 'rotateX(180deg)');
    }, 150)
  }
}
