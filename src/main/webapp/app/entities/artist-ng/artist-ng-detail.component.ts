import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ArtistNg } from './artist-ng.model';
import { ArtistNgService } from './artist-ng.service';

@Component({
    selector: 'jhi-artist-ng-detail',
    templateUrl: './artist-ng-detail.component.html'
})
export class ArtistNgDetailComponent implements OnInit, OnDestroy {

    artist: ArtistNg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private artistService: ArtistNgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInArtists();
    }

    load(id) {
        this.artistService.find(id).subscribe((artist) => {
            this.artist = artist;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInArtists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'artistListModification',
            (response) => this.load(this.artist.id)
        );
    }
}
