import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GenreNg } from './genre-ng.model';
import { GenreNgPopupService } from './genre-ng-popup.service';
import { GenreNgService } from './genre-ng.service';

@Component({
    selector: 'jhi-genre-ng-dialog',
    templateUrl: './genre-ng-dialog.component.html'
})
export class GenreNgDialogComponent implements OnInit {

    genre: GenreNg;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private genreService: GenreNgService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.genre.id !== undefined) {
            this.subscribeToSaveResponse(
                this.genreService.update(this.genre));
        } else {
            this.subscribeToSaveResponse(
                this.genreService.create(this.genre));
        }
    }

    private subscribeToSaveResponse(result: Observable<GenreNg>) {
        result.subscribe((res: GenreNg) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: GenreNg) {
        this.eventManager.broadcast({ name: 'genreListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-genre-ng-popup',
    template: ''
})
export class GenreNgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private genrePopupService: GenreNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.genrePopupService
                    .open(GenreNgDialogComponent as Component, params['id']);
            } else {
                this.genrePopupService
                    .open(GenreNgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
