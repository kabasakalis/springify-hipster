import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringifySharedModule } from '../../shared';
import {
    PlaylistNgService,
    PlaylistNgPopupService,
    PlaylistNgComponent,
    PlaylistNgDetailComponent,
    PlaylistNgDialogComponent,
    PlaylistNgPopupComponent,
    PlaylistNgDeletePopupComponent,
    PlaylistNgDeleteDialogComponent,
    playlistRoute,
    playlistPopupRoute,
} from './';

const ENTITY_STATES = [
    ...playlistRoute,
    ...playlistPopupRoute,
];

@NgModule({
    imports: [
        SpringifySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PlaylistNgComponent,
        PlaylistNgDetailComponent,
        PlaylistNgDialogComponent,
        PlaylistNgDeleteDialogComponent,
        PlaylistNgPopupComponent,
        PlaylistNgDeletePopupComponent,
    ],
    entryComponents: [
        PlaylistNgComponent,
        PlaylistNgDialogComponent,
        PlaylistNgPopupComponent,
        PlaylistNgDeleteDialogComponent,
        PlaylistNgDeletePopupComponent,
    ],
    providers: [
        PlaylistNgService,
        PlaylistNgPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringifyPlaylistNgModule {}
