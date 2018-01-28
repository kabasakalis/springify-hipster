import { BaseEntity } from './../../shared';

export class RoleNg implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
