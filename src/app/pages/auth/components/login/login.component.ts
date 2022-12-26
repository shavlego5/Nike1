import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, CartService} from "../../../../core/services";
import {Router} from "@angular/router";
import {Subject, takeUntil, tap} from "rxjs";
import {PrevRouterService} from "../../../../core/services";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  sub$ = new Subject()

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private prevRouter: PrevRouterService
  ) {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    this.onFocus(event)
    this.onBlur(event)
  }

  isLoaded: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100)
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return


    this.authService.login(this.form.value)
      .pipe(
        takeUntil(this.sub$),
        tap(res => {
          this.cartService.getCarts().subscribe()
        })
      )
      .subscribe(res => {
        console.log(res)
        if (localStorage.getItem('token')) {
          this.router.navigate([this.prevRouter.prevUrl])
        }
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }

  onFocus(event: any) {
    const parent = event.currentTarget.parentNode;
    parent.setAttribute("class", 'focus')
  }

  onBlur(event: any) {
    const parent = event.currentTarget.parentNode;

    if (!event.currentTarget.value) {
      parent.removeAttribute("class", 'focus')
    }
  }

}
