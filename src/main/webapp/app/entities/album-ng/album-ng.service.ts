import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AlbumNg } from './album-ng.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AlbumNgService {

    private resourceUrl =  SERVER_API_URL + 'api/albums';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/albums';

    constructor(private http: Http) { }

    create(album: AlbumNg): Observable<AlbumNg> {
        const copy = this.convert(album);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(album: AlbumNg): Observable<AlbumNg> {
        const copy = this.convert(album);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AlbumNg> {
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
     * Convert a returned JSON object to AlbumNg.
     */
    private convertItemFromServer(json: any): AlbumNg {
        const entity: AlbumNg = Object.assign(new AlbumNg(), json);
        return entity;
    }

    /**
     * Convert a AlbumNg to a JSON which can be sent to the server.
     */
    private convert(album: AlbumNg): AlbumNg {
        const copy: AlbumNg = Object.assign({}, album);
        return copy;
    }
}
