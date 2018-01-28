import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GenreNg } from './genre-ng.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GenreNgService {

    private resourceUrl =  SERVER_API_URL + 'api/genres';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/genres';

    constructor(private http: Http) { }

    create(genre: GenreNg): Observable<GenreNg> {
        const copy = this.convert(genre);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(genre: GenreNg): Observable<GenreNg> {
        const copy = this.convert(genre);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<GenreNg> {
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
     * Convert a returned JSON object to GenreNg.
     */
    private convertItemFromServer(json: any): GenreNg {
        const entity: GenreNg = Object.assign(new GenreNg(), json);
        return entity;
    }

    /**
     * Convert a GenreNg to a JSON which can be sent to the server.
     */
    private convert(genre: GenreNg): GenreNg {
        const copy: GenreNg = Object.assign({}, genre);
        return copy;
    }
}
