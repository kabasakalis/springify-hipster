/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SpringifyTestModule } from '../../../test.module';
import { GenreNgComponent } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng.component';
import { GenreNgService } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng.service';
import { GenreNg } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng.model';

describe('Component Tests', () => {

    describe('GenreNg Management Component', () => {
        let comp: GenreNgComponent;
        let fixture: ComponentFixture<GenreNgComponent>;
        let service: GenreNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [GenreNgComponent],
                providers: [
                    GenreNgService
                ]
            })
            .overrideTemplate(GenreNgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GenreNgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenreNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new GenreNg(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.genres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
