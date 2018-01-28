/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SpringifyTestModule } from '../../../test.module';
import { AlbumNgDetailComponent } from '../../../../../../main/webapp/app/entities/album-ng/album-ng-detail.component';
import { AlbumNgService } from '../../../../../../main/webapp/app/entities/album-ng/album-ng.service';
import { AlbumNg } from '../../../../../../main/webapp/app/entities/album-ng/album-ng.model';

describe('Component Tests', () => {

    describe('AlbumNg Management Detail Component', () => {
        let comp: AlbumNgDetailComponent;
        let fixture: ComponentFixture<AlbumNgDetailComponent>;
        let service: AlbumNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [AlbumNgDetailComponent],
                providers: [
                    AlbumNgService
                ]
            })
            .overrideTemplate(AlbumNgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumNgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlbumNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AlbumNg(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.album).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
