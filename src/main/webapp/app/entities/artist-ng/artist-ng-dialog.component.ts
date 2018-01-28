import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ArtistNg } from './artist-ng.model';
import { ArtistNgPopupService } from './artist-ng-popup.service';
import { ArtistNgService } from './artist-ng.service';
import { GenreNg, GenreNgService } from '../genre-ng';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-artist-ng-dialog',
    templateUrl: './artist-ng-dialog.component.html'
})
export class ArtistNgDialogComponent implements OnInit {

    artist: ArtistNg;
    isSaving: boolean;

    genres: GenreNg[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private artistService: ArtistNgService,
        private genreService: GenreNgService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.genreService.query()
            .subscribe((res: ResponseWrapper) => { this.genres = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.artist.id !== undefined) {
            this.subscribeToSaveResponse(
                this.artistService.update(this.artist));
        } else {
            this.subscribeToSaveResponse(
                this.artistService.create(this.artist));
        }
    }

    private subscribeToSaveResponse(result: Observable<ArtistNg>) {
        result.subscribe((res: ArtistNg) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ArtistNg) {
        this.eventManager.broadcast({ name: 'artistListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGenreById(index: number, item: GenreNg) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-artist-ng-popup',
    template: ''
})
export class ArtistNgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private artistPopupService: ArtistNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.artistPopupService
                    .open(ArtistNgDialogComponent as Component, params['id']);
            } else {
                this.artistPopupService
                    .open(ArtistNgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
