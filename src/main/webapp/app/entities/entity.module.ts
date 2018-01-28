import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SpringifyGenreNgModule } from './genre-ng/genre-ng.module';
import { SpringifyArtistNgModule } from './artist-ng/artist-ng.module';
import { SpringifyAlbumNgModule } from './album-ng/album-ng.module';
import { SpringifyPlaylistNgModule } from './playlist-ng/playlist-ng.module';
import { SpringifyRoleNgModule } from './role-ng/role-ng.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SpringifyGenreNgModule,
        SpringifyArtistNgModule,
        SpringifyAlbumNgModule,
        SpringifyPlaylistNgModule,
        SpringifyRoleNgModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringifyEntityModule {}
