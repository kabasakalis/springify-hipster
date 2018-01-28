import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RoleNgComponent } from './role-ng.component';
import { RoleNgDetailComponent } from './role-ng-detail.component';
import { RoleNgPopupComponent } from './role-ng-dialog.component';
import { RoleNgDeletePopupComponent } from './role-ng-delete-dialog.component';

@Injectable()
export class RoleNgResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const roleRoute: Routes = [
    {
        path: 'role-ng',
        component: RoleNgComponent,
        resolve: {
            'pagingParams': RoleNgResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.role.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'role-ng/:id',
        component: RoleNgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.role.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolePopupRoute: Routes = [
    {
        path: 'role-ng-new',
        component: RoleNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'role-ng/:id/edit',
        component: RoleNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'role-ng/:id/delete',
        component: RoleNgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
