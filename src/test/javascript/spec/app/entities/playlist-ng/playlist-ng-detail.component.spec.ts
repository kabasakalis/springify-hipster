/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SpringifyTestModule } from '../../../test.module';
import { PlaylistNgDetailComponent } from '../../../../../../main/webapp/app/entities/playlist-ng/playlist-ng-detail.component';
import { PlaylistNgService } from '../../../../../../main/webapp/app/entities/playlist-ng/playlist-ng.service';
import { PlaylistNg } from '../../../../../../main/webapp/app/entities/playlist-ng/playlist-ng.model';

describe('Component Tests', () => {

    describe('PlaylistNg Management Detail Component', () => {
        let comp: PlaylistNgDetailComponent;
        let fixture: ComponentFixture<PlaylistNgDetailComponent>;
        let service: PlaylistNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [PlaylistNgDetailComponent],
                providers: [
                    PlaylistNgService
                ]
            })
            .overrideTemplate(PlaylistNgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlaylistNgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaylistNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PlaylistNg(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.playlist).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
