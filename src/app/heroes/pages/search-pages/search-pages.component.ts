import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/services.service';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

@Component({
    selector: 'heroes-search-pages',
    templateUrl: './search-pages.component.html',
    styleUrls: ['./search-pages.component.css'],
})
export class SearchPagesComponent {
    public searchInput = new FormControl('');
    public heroes: Hero[] = [];
    public selectedHero?: Hero;

    constructor(private heroesService: HeroesService) {}

    public searchHero() {
        const value: string = this.searchInput.value || '';
        this.heroesService
            .getSuggestions(value)
            .subscribe(heroes => this.heroes = heroes);
    }

    public onSelectedOption(event: MatAutocompleteSelectedEvent): void {
        if (!event.option.value) {
            this.selectedHero = undefined;
            return;
        }
        const hero: Hero = event.option.value;
        this.searchInput.setValue(hero.superhero);
        this.selectedHero = hero;
    }
}
