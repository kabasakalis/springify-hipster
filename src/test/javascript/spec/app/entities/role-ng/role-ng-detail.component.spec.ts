/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SpringifyTestModule } from '../../../test.module';
import { RoleNgDetailComponent } from '../../../../../../main/webapp/app/entities/role-ng/role-ng-detail.component';
import { RoleNgService } from '../../../../../../main/webapp/app/entities/role-ng/role-ng.service';
import { RoleNg } from '../../../../../../main/webapp/app/entities/role-ng/role-ng.model';

describe('Component Tests', () => {

    describe('RoleNg Management Detail Component', () => {
        let comp: RoleNgDetailComponent;
        let fixture: ComponentFixture<RoleNgDetailComponent>;
        let service: RoleNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [RoleNgDetailComponent],
                providers: [
                    RoleNgService
                ]
            })
            .overrideTemplate(RoleNgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleNgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new RoleNg(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.role).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
