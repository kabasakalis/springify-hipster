import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RoleNg } from './role-ng.model';
import { RoleNgService } from './role-ng.service';

@Component({
    selector: 'jhi-role-ng-detail',
    templateUrl: './role-ng-detail.component.html'
})
export class RoleNgDetailComponent implements OnInit, OnDestroy {

    role: RoleNg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private roleService: RoleNgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRoles();
    }

    load(id) {
        this.roleService.find(id).subscribe((role) => {
            this.role = role;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRoles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'roleListModification',
            (response) => this.load(this.role.id)
        );
    }
}
