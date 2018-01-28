import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AlbumNg } from './album-ng.model';
import { AlbumNgPopupService } from './album-ng-popup.service';
import { AlbumNgService } from './album-ng.service';
import { PlaylistNg, PlaylistNgService } from '../playlist-ng';
import { ArtistNg, ArtistNgService } from '../artist-ng';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-album-ng-dialog',
    templateUrl: './album-ng-dialog.component.html'
})
export class AlbumNgDialogComponent implements OnInit {

    album: AlbumNg;
    isSaving: boolean;

    playlists: PlaylistNg[];

    artists: ArtistNg[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private albumService: AlbumNgService,
        private playlistService: PlaylistNgService,
        private artistService: ArtistNgService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.playlistService.query()
            .subscribe((res: ResponseWrapper) => { this.playlists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.artistService.query()
            .subscribe((res: ResponseWrapper) => { this.artists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.album.id !== undefined) {
            this.subscribeToSaveResponse(
                this.albumService.update(this.album));
        } else {
            this.subscribeToSaveResponse(
                this.albumService.create(this.album));
        }
    }

    private subscribeToSaveResponse(result: Observable<AlbumNg>) {
        result.subscribe((res: AlbumNg) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AlbumNg) {
        this.eventManager.broadcast({ name: 'albumListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPlaylistById(index: number, item: PlaylistNg) {
        return item.id;
    }

    trackArtistById(index: number, item: ArtistNg) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-album-ng-popup',
    template: ''
})
export class AlbumNgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private albumPopupService: AlbumNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.albumPopupService
                    .open(AlbumNgDialogComponent as Component, params['id']);
            } else {
                this.albumPopupService
                    .open(AlbumNgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
