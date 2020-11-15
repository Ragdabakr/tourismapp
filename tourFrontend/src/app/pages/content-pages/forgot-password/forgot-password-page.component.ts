import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    @ViewChild('f') forogtPasswordForm: NgForm;
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
            )

        }
    );
    token: any;

    constructor(private router: Router, private authService: AuthService,
        private route: ActivatedRoute) { }

    // On reset click, reset form fields
    onReset() {
        this.forogtPasswordForm.reset();
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
    // On submit link click
    onSubmit() {
        if (this.authForm.invalid) {
            return;
        }
        console.log(this.authForm.value);
        this.authService.forgotPassword(this.authForm.value).subscribe({
            next: response => {
            },
            error: err => {
                console.log(err);
                if (!err.status) {
                    this.authForm.setErrors({ noConnection: true });
                } else {
                    this.authForm.setErrors({ unknownError: true });
                }
            }
        });
    }
}