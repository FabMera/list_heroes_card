import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from './../../services/services.service';

@Component({
    selector: 'heroes-list-pages',
    templateUrl: './list-pages.component.html',
    styleUrls: ['./list-pages.component.css'],
})
export class ListPagesComponent implements OnInit {
    public heroes: Hero[] = [];
    constructor(private HeroesService: HeroesService) {}
    ngOnInit(): void {
        this.HeroesService.getHeroes().subscribe(
            (heroes) => (this.heroes = heroes)
        );
    }
}
