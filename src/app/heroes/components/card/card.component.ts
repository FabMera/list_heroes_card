import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements  OnInit {

    @Input()
    public hero!:Hero;
    ngOnInit(): void {
        if(!this.hero){
            throw new Error('hero is required')
        }
    }

}
