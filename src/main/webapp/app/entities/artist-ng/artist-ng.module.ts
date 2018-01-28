import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringifySharedModule } from '../../shared';
import {
    ArtistNgService,
    ArtistNgPopupService,
    ArtistNgComponent,
    ArtistNgDetailComponent,
    ArtistNgDialogComponent,
    ArtistNgPopupComponent,
    ArtistNgDeletePopupComponent,
    ArtistNgDeleteDialogComponent,
    artistRoute,
    artistPopupRoute,
} from './';

const ENTITY_STATES = [
    ...artistRoute,
    ...artistPopupRoute,
];

@NgModule({
    imports: [
        SpringifySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ArtistNgComponent,
        ArtistNgDetailComponent,
        ArtistNgDialogComponent,
        ArtistNgDeleteDialogComponent,
        ArtistNgPopupComponent,
        ArtistNgDeletePopupComponent,
    ],
    entryComponents: [
        ArtistNgComponent,
        ArtistNgDialogComponent,
        ArtistNgPopupComponent,
        ArtistNgDeleteDialogComponent,
        ArtistNgDeletePopupComponent,
    ],
    providers: [
        ArtistNgService,
        ArtistNgPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringifyArtistNgModule {}
