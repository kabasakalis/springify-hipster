/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SpringifyTestModule } from '../../../test.module';
import { PlaylistNgComponent } from '../../../../../../main/webapp/app/entities/playlist-ng/playlist-ng.component';
import { PlaylistNgService } from '../../../../../../main/webapp/app/entities/playlist-ng/playlist-ng.service';
import { PlaylistNg } from '../../../../../../main/webapp/app/entities/playlist-ng/playlist-ng.model';

describe('Component Tests', () => {

    describe('PlaylistNg Management Component', () => {
        let comp: PlaylistNgComponent;
        let fixture: ComponentFixture<PlaylistNgComponent>;
        let service: PlaylistNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [PlaylistNgComponent],
                providers: [
                    PlaylistNgService
                ]
            })
            .overrideTemplate(PlaylistNgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlaylistNgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaylistNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PlaylistNg(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.playlists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
