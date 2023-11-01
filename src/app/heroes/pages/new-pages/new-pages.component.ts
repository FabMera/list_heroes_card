import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'heroes-new-pages',
    templateUrl: './new-pages.component.html',
    styleUrls: ['./new-pages.component.css'],
})
export class NewPagesComponent implements OnInit {
    /* nonNullable = true,indica que superhero nunca va a ser un valor nulo */

    public heroForm = new FormGroup({
        id: new FormControl(''),
        superhero: new FormControl('', { nonNullable: true }),
        publisher: new FormControl<Publisher>(Publisher.DCComics),
        alter_ego: new FormControl(''),
        first_appearance: new FormControl(''),
        characters: new FormControl(''),
        alt_img: new FormControl(''),
    });

    public publishers = [
        {
            id: 'DC Comics',
            desc: 'DC - Comics',
        },
        {
            id: 'Marvel Comics',
            desc: 'Marvel - Comics',
        },
    ];
    constructor(
        private heroService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    get currentHero(): Hero {
        const hero = this.heroForm.value as Hero;
        return hero;
    }

    ngOnInit(): void {
        if (!this.router.url.includes('edit')) return;
        this.activatedRoute.params
            .pipe(switchMap(({ id }) => this.heroService.getHeroesById(id)))
            .subscribe((hero) => {
                if (!hero) {
                    return this.router.navigateByUrl('/');
                }
                this.heroForm.reset(hero);
                return;
            });
    }

    public onSubmit(): void {
        if (this.heroForm.invalid) {
            return;
        }
        if (this.currentHero.id) {
            this.heroService.updateHero(this.currentHero).subscribe((hero) => {
                this.showSnackbar(`${hero.superhero} actualizado`);
            });
            return;
        }
        this.heroService.addHero(this.currentHero).subscribe((hero) => {
            this.router.navigate(['/heroes/edit', hero.id]);
            this.showSnackbar(`${hero.superhero} creado!`);
        });
    }

    public onDeleteHero(): void {
        if (!this.currentHero.id) return;
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: this.heroForm.value,
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.heroService
                    .deleteHero(this.currentHero.id!)
                    .subscribe((resp) => {
                        this.router.navigate(['/heroes']);
                        this.showSnackbar(
                            `${this.currentHero.superhero} eliminado!`
                        );
                    });
            }
        });
    }

    showSnackbar(message: string): void {
        this.snackbar.open(message, 'ok!', {
            duration: 2500,
        });
    }
}
