import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ArtistNg } from './artist-ng.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ArtistNgService {

    private resourceUrl =  SERVER_API_URL + 'api/artists';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/artists';

    constructor(private http: Http) { }

    create(artist: ArtistNg): Observable<ArtistNg> {
        const copy = this.convert(artist);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(artist: ArtistNg): Observable<ArtistNg> {
        const copy = this.convert(artist);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ArtistNg> {
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
     * Convert a returned JSON object to ArtistNg.
     */
    private convertItemFromServer(json: any): ArtistNg {
        const entity: ArtistNg = Object.assign(new ArtistNg(), json);
        return entity;
    }

    /**
     * Convert a ArtistNg to a JSON which can be sent to the server.
     */
    private convert(artist: ArtistNg): ArtistNg {
        const copy: ArtistNg = Object.assign({}, artist);
        return copy;
    }
}
