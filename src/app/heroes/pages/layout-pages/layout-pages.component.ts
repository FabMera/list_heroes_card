import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'heroes-layout-pages',
    templateUrl: './layout-pages.component.html',
    styleUrls: ['./layout-pages.component.css'],
})
export class LayoutPagesComponent {
    public sidebarItems = [
        { label: 'Listado', icon: 'label', url: './list' },
        { label: 'Añadir', icon: 'add', url: './new-hero' },
        { label: 'Buscar', icon: 'search', url: './search' },
    ];

    constructor(private authService: AuthService, private router : Router) {}

    get user(): User | undefined {
        return this.authService.currentUser;
    }

    public onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login'])
    }
}
