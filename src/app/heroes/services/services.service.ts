import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environments.prod';

@Injectable({
    providedIn: 'root',
})
export class HeroesService {
    private baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) {}

    public getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
    }
    public getHeroesById(id: string): Observable<Hero | undefined> {
        return this.http
            .get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(catchError((err) => of(undefined)));
    }
    public getSuggestions(query: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(
            `${this.baseUrl}/heroes?q=${query}&_limit=6`
        );
    }

    public addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
    }
    public updateHero(hero: Hero): Observable<Hero> {
        if (!hero.id) {
            throw new Error('El id es necesario para actualizar');
        }
        return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }

    public deleteHero(id: string): Observable<boolean> {
        return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
            catchError((err) => of(false)),
            map((resp) => true)
        );
    }
}
