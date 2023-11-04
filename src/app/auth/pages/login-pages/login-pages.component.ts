import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-login-pages',
    templateUrl: './login-pages.component.html',
    styleUrls: ['./login-pages.component.css'],
})
export class LoginPagesComponent {
    constructor(private authService: AuthService, private router: Router) {}

    public onLogin(): void {
        this.authService.login('fabian@correo.com', '123456')
        .subscribe(user=>{
            this.router.navigate(['/heroes'])
        })
    }
}
