import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ArtistNg } from './artist-ng.model';
import { ArtistNgPopupService } from './artist-ng-popup.service';
import { ArtistNgService } from './artist-ng.service';

@Component({
    selector: 'jhi-artist-ng-delete-dialog',
    templateUrl: './artist-ng-delete-dialog.component.html'
})
export class ArtistNgDeleteDialogComponent {

    artist: ArtistNg;

    constructor(
        private artistService: ArtistNgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.artistService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'artistListModification',
                content: 'Deleted an artist'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-artist-ng-delete-popup',
    template: ''
})
export class ArtistNgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private artistPopupService: ArtistNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.artistPopupService
                .open(ArtistNgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
