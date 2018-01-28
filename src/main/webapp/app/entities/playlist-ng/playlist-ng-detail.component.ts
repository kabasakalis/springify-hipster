import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PlaylistNg } from './playlist-ng.model';
import { PlaylistNgService } from './playlist-ng.service';

@Component({
    selector: 'jhi-playlist-ng-detail',
    templateUrl: './playlist-ng-detail.component.html'
})
export class PlaylistNgDetailComponent implements OnInit, OnDestroy {

    playlist: PlaylistNg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private playlistService: PlaylistNgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPlaylists();
    }

    load(id) {
        this.playlistService.find(id).subscribe((playlist) => {
            this.playlist = playlist;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPlaylists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'playlistListModification',
            (response) => this.load(this.playlist.id)
        );
    }
}
