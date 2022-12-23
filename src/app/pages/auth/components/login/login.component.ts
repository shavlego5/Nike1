import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, CartService} from "../../../../core/services";
import {Router} from "@angular/router";
import {Subject, takeUntil, tap} from "rxjs";
import {PrevRouterService} from "../../../../core/services/prev-router.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

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

  ngOnInit(): void {

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
}
