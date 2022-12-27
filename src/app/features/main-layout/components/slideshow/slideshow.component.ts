import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {RouteChangeService} from "../../../../core/services/route-change.service";

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements AfterViewInit {

  @ViewChild('slideshowImages') images!: ElementRef;
  @ViewChild('slideshowText') text!: ElementRef;

  constructor(public routeChange: RouteChangeService) {
  }

  slideShowInterval: number = 5000;

  timer = setInterval(() => {
    this.next();
  }, this.slideShowInterval)

  ngAfterViewInit() {
    // Array.from(this.images.nativeElement.children).forEach((image: any) => {
    //   if(getComputedStyle(image).opacity) {
    //     if(image.nextElementSibling) {
    //       image.style.opacity = 0;
    //       image.nextElementSibling.style.opacity = 1;
    //     }
    //   }
    // })
  }

  activeText(activeIndex: number, inActiveIndex: number) {
    this.text.nativeElement.children[inActiveIndex].classList.remove('active-text');
    this.text.nativeElement.children[activeIndex].classList.add('active-text');
  }

  next() {
    Array.from(this.images.nativeElement.children).forEach((image: any) => {
      if (image.getAttribute('id') === 'active') {
        if (image.nextElementSibling) {
          setTimeout(() => {
            image.removeAttribute('id')
            image.nextElementSibling.setAttribute('id', 'active');
            this.activeText(Array.from(this.images.nativeElement.children).indexOf(image) + 1,
              Array.from(this.images.nativeElement.children).indexOf(image))
          }, 100)
        } else {
          setTimeout(() => {
            image.removeAttribute('id');
            this.images.nativeElement.children[0].setAttribute('id', 'active');
            this.activeText(0,
              Array.from(this.images.nativeElement.children).indexOf(image))
          })
        }
      }
    })
  }

  prev() {
    Array.from(this.images.nativeElement.children).forEach((image: any) => {
      if (image.getAttribute('id') === 'active') {
        if (image.previousElementSibling) {
          setTimeout(() => {
            image.removeAttribute('id')
            image.previousElementSibling.setAttribute('id', 'active');
            this.activeText(Array.from(this.images.nativeElement.children).indexOf(image) - 1,
              Array.from(this.images.nativeElement.children).indexOf(image))
          }, 100)
        } else {
          setTimeout(() => {
            image.removeAttribute('id')
            this.images.nativeElement.children[this.images.nativeElement.children.length - 1].setAttribute('id', 'active');
            this.activeText(this.images.nativeElement.children.length - 1,
              Array.from(this.images.nativeElement.children).indexOf(image))
          }, 100)
        }
      }
    })
  }

  enter() {
    clearInterval(this.timer)
  }

  leave() {
    this.timer = setInterval(() => {
      this.next();
    }, this.slideShowInterval)
  }
}
