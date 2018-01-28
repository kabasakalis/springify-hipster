/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SpringifyTestModule } from '../../../test.module';
import { ArtistNgDetailComponent } from '../../../../../../main/webapp/app/entities/artist-ng/artist-ng-detail.component';
import { ArtistNgService } from '../../../../../../main/webapp/app/entities/artist-ng/artist-ng.service';
import { ArtistNg } from '../../../../../../main/webapp/app/entities/artist-ng/artist-ng.model';

describe('Component Tests', () => {

    describe('ArtistNg Management Detail Component', () => {
        let comp: ArtistNgDetailComponent;
        let fixture: ComponentFixture<ArtistNgDetailComponent>;
        let service: ArtistNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [ArtistNgDetailComponent],
                providers: [
                    ArtistNgService
                ]
            })
            .overrideTemplate(ArtistNgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArtistNgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArtistNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ArtistNg(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.artist).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
