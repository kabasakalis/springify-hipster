import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringifySharedModule } from '../../shared';
import {
    GenreNgService,
    GenreNgPopupService,
    GenreNgComponent,
    GenreNgDetailComponent,
    GenreNgDialogComponent,
    GenreNgPopupComponent,
    GenreNgDeletePopupComponent,
    GenreNgDeleteDialogComponent,
    genreRoute,
    genrePopupRoute,
    GenreNgResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...genreRoute,
    ...genrePopupRoute,
];

@NgModule({
    imports: [
        SpringifySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GenreNgComponent,
        GenreNgDetailComponent,
        GenreNgDialogComponent,
        GenreNgDeleteDialogComponent,
        GenreNgPopupComponent,
        GenreNgDeletePopupComponent,
    ],
    entryComponents: [
        GenreNgComponent,
        GenreNgDialogComponent,
        GenreNgPopupComponent,
        GenreNgDeleteDialogComponent,
        GenreNgDeletePopupComponent,
    ],
    providers: [
        GenreNgService,
        GenreNgPopupService,
        GenreNgResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringifyGenreNgModule {}
