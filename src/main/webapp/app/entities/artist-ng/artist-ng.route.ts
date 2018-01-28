import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ArtistNgComponent } from './artist-ng.component';
import { ArtistNgDetailComponent } from './artist-ng-detail.component';
import { ArtistNgPopupComponent } from './artist-ng-dialog.component';
import { ArtistNgDeletePopupComponent } from './artist-ng-delete-dialog.component';

export const artistRoute: Routes = [
    {
        path: 'artist-ng',
        component: ArtistNgComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.artist.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'artist-ng/:id',
        component: ArtistNgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.artist.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const artistPopupRoute: Routes = [
    {
        path: 'artist-ng-new',
        component: ArtistNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.artist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'artist-ng/:id/edit',
        component: ArtistNgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.artist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'artist-ng/:id/delete',
        component: ArtistNgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'springifyApp.artist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
