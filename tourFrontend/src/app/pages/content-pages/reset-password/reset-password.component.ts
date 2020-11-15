

import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth/auth.service';
import { MatchPassword } from '../match-password';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    @ViewChild('f') registerForm: NgForm;
    authForm = new FormGroup(
        {
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
    token: any;
    email: any;

    constructor(
        private matchPassword: MatchPassword,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.email = param['email'];
                this.token = param['token'];
            });
    }

    //  On submit click, reset field value
    onSubmits() {
        this.registerForm.reset();
    }
    onSubmit() {
        if (this.authForm.invalid) {
            return;
        }

        this.authService.ResetPassword(this.authForm.value , this.token , this.email).subscribe({
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



