/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SpringifyTestModule } from '../../../test.module';
import { GenreNgDetailComponent } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng-detail.component';
import { GenreNgService } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng.service';
import { GenreNg } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng.model';

describe('Component Tests', () => {

    describe('GenreNg Management Detail Component', () => {
        let comp: GenreNgDetailComponent;
        let fixture: ComponentFixture<GenreNgDetailComponent>;
        let service: GenreNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [GenreNgDetailComponent],
                providers: [
                    GenreNgService
                ]
            })
            .overrideTemplate(GenreNgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GenreNgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenreNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new GenreNg(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.genre).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
