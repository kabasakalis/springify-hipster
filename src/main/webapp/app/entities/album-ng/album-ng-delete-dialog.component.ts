import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlbumNg } from './album-ng.model';
import { AlbumNgPopupService } from './album-ng-popup.service';
import { AlbumNgService } from './album-ng.service';

@Component({
    selector: 'jhi-album-ng-delete-dialog',
    templateUrl: './album-ng-delete-dialog.component.html'
})
export class AlbumNgDeleteDialogComponent {

    album: AlbumNg;

    constructor(
        private albumService: AlbumNgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.albumService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'albumListModification',
                content: 'Deleted an album'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-album-ng-delete-popup',
    template: ''
})
export class AlbumNgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private albumPopupService: AlbumNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.albumPopupService
                .open(AlbumNgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
