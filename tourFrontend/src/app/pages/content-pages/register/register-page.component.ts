import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth/auth.service';
import { MatchPassword } from '../match-password';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
    @ViewChild('f') registerForm: NgForm;
    authForm = new FormGroup(
        {
            name: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                ]
            ),
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
            passwordConfirmation: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20)
            ])
        },
        { validators: [this.matchPassword.validate] }
    );
    constructor(
        private matchPassword: MatchPassword,
        private authService: AuthService
    ) { }
    //  On submit click, reset field value
    onSubmits() {
        this.registerForm.reset();
    }
    onSubmit() {
        if (this.authForm.invalid) {
            return;
        }

        this.authService.SignUp(this.authForm.value).subscribe({
            next: response => {
                console.log(response);
                // Navigate to some other route
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



