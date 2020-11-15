import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f') loginForm: NgForm;
    authForm = new FormGroup(
        {
            email: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
                ]
            ),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20)
            ]),

        } 
    );
    token: any;
    
    constructor(private router: Router, private authService: AuthService,
        private route: ActivatedRoute) { }

    // On submit button click    
    onReset() {
        this.loginForm.reset();
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
    // On login link click
    onSubmit() {
        if (this.authForm.invalid) {
            return;
        }
        console.log(this.authForm.value);
        this.authService.SignIn(this.authForm.value).subscribe({
            next: response => {
                this.token = response;
                const userToken = localStorage.setItem('token', this.token);
                this.router.navigate(['/']);
            },
            error: err => {
                console.log(err);
                this.router.navigate(['/pages/login']);
                if (!err.status) {
                    this.authForm.setErrors({ noConnection: true });
                } else {
                    this.authForm.setErrors({ unknownError: true });
                }
            }
        });
    }
}


