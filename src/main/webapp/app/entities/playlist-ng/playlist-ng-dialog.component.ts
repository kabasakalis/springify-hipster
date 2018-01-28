import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PlaylistNg } from './playlist-ng.model';
import { PlaylistNgPopupService } from './playlist-ng-popup.service';
import { PlaylistNgService } from './playlist-ng.service';
import { AlbumNg, AlbumNgService } from '../album-ng';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-playlist-ng-dialog',
    templateUrl: './playlist-ng-dialog.component.html'
})
export class PlaylistNgDialogComponent implements OnInit {

    playlist: PlaylistNg;
    isSaving: boolean;

    albums: AlbumNg[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private playlistService: PlaylistNgService,
        private albumService: AlbumNgService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.albumService.query()
            .subscribe((res: ResponseWrapper) => { this.albums = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.playlist.id !== undefined) {
            this.subscribeToSaveResponse(
                this.playlistService.update(this.playlist));
        } else {
            this.subscribeToSaveResponse(
                this.playlistService.create(this.playlist));
        }
    }

    private subscribeToSaveResponse(result: Observable<PlaylistNg>) {
        result.subscribe((res: PlaylistNg) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PlaylistNg) {
        this.eventManager.broadcast({ name: 'playlistListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlbumById(index: number, item: AlbumNg) {
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
    selector: 'jhi-playlist-ng-popup',
    template: ''
})
export class PlaylistNgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playlistPopupService: PlaylistNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.playlistPopupService
                    .open(PlaylistNgDialogComponent as Component, params['id']);
            } else {
                this.playlistPopupService
                    .open(PlaylistNgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
