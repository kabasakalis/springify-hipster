import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AlbumNgComponent } from './album-ng.component';
import { AlbumNgDetailComponent } from './album-ng-detail.component';
import { AlbumNgPopupComponent } from './album-ng-dialog.component';
import { AlbumNgDeletePopupComponent } from './album-ng-delete-dialog.component';

export const albumRoute: Routes = [
    {
        path: 'album-ng',
        component: AlbumNgComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.album.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'album-ng/:id',
        component: AlbumNgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.album.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const albumPopupRoute: Routes = [
    {
        path: 'album-ng-new',
        component: AlbumNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.album.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'album-ng/:id/edit',
        component: AlbumNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.album.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'album-ng/:id/delete',
        component: AlbumNgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.album.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
