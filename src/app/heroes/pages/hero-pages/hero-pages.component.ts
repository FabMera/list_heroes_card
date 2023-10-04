import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/services.service';
import { ActivatedRoute,Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
    selector: 'heroes-hero-pages',
    templateUrl: './hero-pages.component.html',
    styleUrls: ['./hero-pages.component.css'],
})
export class HeroPagesComponent implements OnInit {

    public hero?:Hero;

    constructor(
        private heroesService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router:Router
    ) {}
    ngOnInit(): void {
        this.activatedRoute.params.pipe(delay(2000),switchMap(({id})=>this.heroesService.getHeroesById(id)),

        ).subscribe(hero => {
            if(!hero) return this.router.navigate(['/heroes/list']);
            this.hero = hero;
            return;
        });
    }

    public goBack():void{
        this.router.navigate(['/heroes/list']);
    }
}
