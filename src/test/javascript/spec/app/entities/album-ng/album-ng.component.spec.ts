/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SpringifyTestModule } from '../../../test.module';
import { AlbumNgComponent } from '../../../../../../main/webapp/app/entities/album-ng/album-ng.component';
import { AlbumNgService } from '../../../../../../main/webapp/app/entities/album-ng/album-ng.service';
import { AlbumNg } from '../../../../../../main/webapp/app/entities/album-ng/album-ng.model';

describe('Component Tests', () => {

    describe('AlbumNg Management Component', () => {
        let comp: AlbumNgComponent;
        let fixture: ComponentFixture<AlbumNgComponent>;
        let service: AlbumNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [AlbumNgComponent],
                providers: [
                    AlbumNgService
                ]
            })
            .overrideTemplate(AlbumNgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumNgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlbumNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AlbumNg(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.albums[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
