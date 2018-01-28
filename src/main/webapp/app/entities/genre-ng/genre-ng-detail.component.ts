import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GenreNg } from './genre-ng.model';
import { GenreNgService } from './genre-ng.service';

@Component({
    selector: 'jhi-genre-ng-detail',
    templateUrl: './genre-ng-detail.component.html'
})
export class GenreNgDetailComponent implements OnInit, OnDestroy {

    genre: GenreNg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private genreService: GenreNgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGenres();
    }

    load(id) {
        this.genreService.find(id).subscribe((genre) => {
            this.genre = genre;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGenres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'genreListModification',
            (response) => this.load(this.genre.id)
        );
    }
}
