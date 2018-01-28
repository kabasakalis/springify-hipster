import { BaseEntity } from './../../shared';

export class AlbumNg implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public year?: string,
        public playlists?: BaseEntity[],
        public artist?: BaseEntity,
    ) {
    }
}
