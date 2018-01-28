import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringifySharedModule } from '../../shared';
import {
    AlbumNgService,
    AlbumNgPopupService,
    AlbumNgComponent,
    AlbumNgDetailComponent,
    AlbumNgDialogComponent,
    AlbumNgPopupComponent,
    AlbumNgDeletePopupComponent,
    AlbumNgDeleteDialogComponent,
    albumRoute,
    albumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...albumRoute,
    ...albumPopupRoute,
];

@NgModule({
    imports: [
        SpringifySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AlbumNgComponent,
        AlbumNgDetailComponent,
        AlbumNgDialogComponent,
        AlbumNgDeleteDialogComponent,
        AlbumNgPopupComponent,
        AlbumNgDeletePopupComponent,
    ],
    entryComponents: [
        AlbumNgComponent,
        AlbumNgDialogComponent,
        AlbumNgPopupComponent,
        AlbumNgDeleteDialogComponent,
        AlbumNgDeletePopupComponent,
    ],
    providers: [
        AlbumNgService,
        AlbumNgPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringifyAlbumNgModule {}
