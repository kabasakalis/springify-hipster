import { BaseEntity } from './../../shared';

export class ArtistNg implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public country?: string,
        public albums?: BaseEntity[],
        public genre?: BaseEntity,
    ) {
    }
}
