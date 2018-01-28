import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PlaylistNg } from './playlist-ng.model';
import { PlaylistNgPopupService } from './playlist-ng-popup.service';
import { PlaylistNgService } from './playlist-ng.service';

@Component({
    selector: 'jhi-playlist-ng-delete-dialog',
    templateUrl: './playlist-ng-delete-dialog.component.html'
})
export class PlaylistNgDeleteDialogComponent {

    playlist: PlaylistNg;

    constructor(
        private playlistService: PlaylistNgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.playlistService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'playlistListModification',
                content: 'Deleted an playlist'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-playlist-ng-delete-popup',
    template: ''
})
export class PlaylistNgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private playlistPopupService: PlaylistNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.playlistPopupService
                .open(PlaylistNgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
