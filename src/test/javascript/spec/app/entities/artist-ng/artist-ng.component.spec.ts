/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SpringifyTestModule } from '../../../test.module';
import { ArtistNgComponent } from '../../../../../../main/webapp/app/entities/artist-ng/artist-ng.component';
import { ArtistNgService } from '../../../../../../main/webapp/app/entities/artist-ng/artist-ng.service';
import { ArtistNg } from '../../../../../../main/webapp/app/entities/artist-ng/artist-ng.model';

describe('Component Tests', () => {

    describe('ArtistNg Management Component', () => {
        let comp: ArtistNgComponent;
        let fixture: ComponentFixture<ArtistNgComponent>;
        let service: ArtistNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [ArtistNgComponent],
                providers: [
                    ArtistNgService
                ]
            })
            .overrideTemplate(ArtistNgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArtistNgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArtistNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ArtistNg(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.artists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
