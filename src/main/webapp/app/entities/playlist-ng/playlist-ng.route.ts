import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PlaylistNgComponent } from './playlist-ng.component';
import { PlaylistNgDetailComponent } from './playlist-ng-detail.component';
import { PlaylistNgPopupComponent } from './playlist-ng-dialog.component';
import { PlaylistNgDeletePopupComponent } from './playlist-ng-delete-dialog.component';

export const playlistRoute: Routes = [
    {
        path: 'playlist-ng',
        component: PlaylistNgComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.playlist.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'playlist-ng/:id',
        component: PlaylistNgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.playlist.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const playlistPopupRoute: Routes = [
    {
        path: 'playlist-ng-new',
        component: PlaylistNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.playlist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'playlist-ng/:id/edit',
        component: PlaylistNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.playlist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'playlist-ng/:id/delete',
        component: PlaylistNgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.playlist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
