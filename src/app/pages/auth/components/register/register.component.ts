import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
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

    this.authService.register(this.form.value).subscribe(res => {
      this.router.navigate(['/auth/login'])
    })
  }

  onFocus(event: any) {
    const parent = event.currentTarget.parentNode;
    parent.setAttribute("class", 'focus')
  }
}
