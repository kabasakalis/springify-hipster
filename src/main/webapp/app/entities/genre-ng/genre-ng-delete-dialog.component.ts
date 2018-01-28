import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GenreNg } from './genre-ng.model';
import { GenreNgPopupService } from './genre-ng-popup.service';
import { GenreNgService } from './genre-ng.service';

@Component({
    selector: 'jhi-genre-ng-delete-dialog',
    templateUrl: './genre-ng-delete-dialog.component.html'
})
export class GenreNgDeleteDialogComponent {

    genre: GenreNg;

    constructor(
        private genreService: GenreNgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.genreService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'genreListModification',
                content: 'Deleted an genre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-genre-ng-delete-popup',
    template: ''
})
export class GenreNgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private genrePopupService: GenreNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.genrePopupService
                .open(GenreNgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
