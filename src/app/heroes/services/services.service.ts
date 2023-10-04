import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    public getHeroesById(id: string): Observable<Hero> {
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`);
    }
}
