import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RoleNg } from './role-ng.model';
import { RoleNgPopupService } from './role-ng-popup.service';
import { RoleNgService } from './role-ng.service';

@Component({
    selector: 'jhi-role-ng-dialog',
    templateUrl: './role-ng-dialog.component.html'
})
export class RoleNgDialogComponent implements OnInit {

    role: RoleNg;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private roleService: RoleNgService,
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
        if (this.role.id !== undefined) {
            this.subscribeToSaveResponse(
                this.roleService.update(this.role));
        } else {
            this.subscribeToSaveResponse(
                this.roleService.create(this.role));
        }
    }

    private subscribeToSaveResponse(result: Observable<RoleNg>) {
        result.subscribe((res: RoleNg) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RoleNg) {
        this.eventManager.broadcast({ name: 'roleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-role-ng-popup',
    template: ''
})
export class RoleNgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolePopupService: RoleNgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rolePopupService
                    .open(RoleNgDialogComponent as Component, params['id']);
            } else {
                this.rolePopupService
                    .open(RoleNgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
