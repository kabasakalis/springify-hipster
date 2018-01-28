import { BaseEntity } from './../../shared';

export class GenreNg implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public artists?: BaseEntity[],
    ) {
    }
}
