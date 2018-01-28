import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PlaylistNg } from './playlist-ng.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PlaylistNgService {

    private resourceUrl =  SERVER_API_URL + 'api/playlists';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/playlists';

    constructor(private http: Http) { }

    create(playlist: PlaylistNg): Observable<PlaylistNg> {
        const copy = this.convert(playlist);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(playlist: PlaylistNg): Observable<PlaylistNg> {
        const copy = this.convert(playlist);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PlaylistNg> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to PlaylistNg.
     */
    private convertItemFromServer(json: any): PlaylistNg {
        const entity: PlaylistNg = Object.assign(new PlaylistNg(), json);
        return entity;
    }

    /**
     * Convert a PlaylistNg to a JSON which can be sent to the server.
     */
    private convert(playlist: PlaylistNg): PlaylistNg {
        const copy: PlaylistNg = Object.assign({}, playlist);
        return copy;
    }
}
