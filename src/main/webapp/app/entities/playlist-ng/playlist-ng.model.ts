import { BaseEntity } from './../../shared';

export class PlaylistNg implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public albums?: BaseEntity[],
    ) {
    }
}
