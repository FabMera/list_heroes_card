import { Component } from '@angular/core';

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
}
