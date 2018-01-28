import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoleNg } from './role-ng.model';
import { RoleNgPopupService } from './role-ng-popup.service';
import { RoleNgService } from './role-ng.service';

@Component({
    selector: 'jhi-role-ng-delete-dialog',
    templateUrl: './role-ng-delete-dialog.component.html'
})
export class RoleNgDeleteDialogComponent {

    role: RoleNg;

    constructor(
        private roleService: RoleNgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'roleListModification',
                content: 'Deleted an role'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-role-ng-delete-popup',
    template: ''
})
export class RoleNgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolePopupService: RoleNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rolePopupService
                .open(RoleNgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
