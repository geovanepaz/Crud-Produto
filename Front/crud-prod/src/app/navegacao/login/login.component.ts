import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/navegacao/services/authentication.service';
import { LoginHelper } from 'src/app/core/_helpers/login-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService, 
        private loginHelper: LoginHelper
    ) { 
        // redirect to home if already logged in
        if (this.loginHelper.estaAutenticado) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['geovane@gmail.com', [Validators.required, Validators.email]],
            senha: ['Teste1@', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.authenticationService.login(this.f.email.value, this.f.senha.value)
        .subscribe(
            () => { this.router.navigate([this.returnUrl]) },
            error => {
                this.error = error.error.message;
                this.loading = false;
            }
        );
    }
}
