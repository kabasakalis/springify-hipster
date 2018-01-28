import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpringifySharedModule } from '../../shared';
import {
    RoleNgService,
    RoleNgPopupService,
    RoleNgComponent,
    RoleNgDetailComponent,
    RoleNgDialogComponent,
    RoleNgPopupComponent,
    RoleNgDeletePopupComponent,
    RoleNgDeleteDialogComponent,
    roleRoute,
    rolePopupRoute,
    RoleNgResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...roleRoute,
    ...rolePopupRoute,
];

@NgModule({
    imports: [
        SpringifySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoleNgComponent,
        RoleNgDetailComponent,
        RoleNgDialogComponent,
        RoleNgDeleteDialogComponent,
        RoleNgPopupComponent,
        RoleNgDeletePopupComponent,
    ],
    entryComponents: [
        RoleNgComponent,
        RoleNgDialogComponent,
        RoleNgPopupComponent,
        RoleNgDeleteDialogComponent,
        RoleNgDeletePopupComponent,
    ],
    providers: [
        RoleNgService,
        RoleNgPopupService,
        RoleNgResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpringifyRoleNgModule {}
