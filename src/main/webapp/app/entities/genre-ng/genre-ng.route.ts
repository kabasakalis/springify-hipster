import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GenreNgComponent } from './genre-ng.component';
import { GenreNgDetailComponent } from './genre-ng-detail.component';
import { GenreNgPopupComponent } from './genre-ng-dialog.component';
import { GenreNgDeletePopupComponent } from './genre-ng-delete-dialog.component';

@Injectable()
export class GenreNgResolvePagingParams implements Resolve<any> {

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

export const genreRoute: Routes = [
    {
        path: 'genre-ng',
        component: GenreNgComponent,
        resolve: {
            'pagingParams': GenreNgResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.genre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'genre-ng/:id',
        component: GenreNgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.genre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const genrePopupRoute: Routes = [
    {
        path: 'genre-ng-new',
        component: GenreNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.genre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genre-ng/:id/edit',
        component: GenreNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.genre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genre-ng/:id/delete',
        component: GenreNgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.genre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
