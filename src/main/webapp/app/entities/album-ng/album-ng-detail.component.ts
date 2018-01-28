import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AlbumNg } from './album-ng.model';
import { AlbumNgService } from './album-ng.service';

@Component({
    selector: 'jhi-album-ng-detail',
    templateUrl: './album-ng-detail.component.html'
})
export class AlbumNgDetailComponent implements OnInit, OnDestroy {

    album: AlbumNg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private albumService: AlbumNgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAlbums();
    }

    load(id) {
        this.albumService.find(id).subscribe((album) => {
            this.album = album;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlbums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'albumListModification',
            (response) => this.load(this.album.id)
        );
    }
}
