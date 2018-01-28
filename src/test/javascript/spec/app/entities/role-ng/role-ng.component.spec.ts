/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SpringifyTestModule } from '../../../test.module';
import { RoleNgComponent } from '../../../../../../main/webapp/app/entities/role-ng/role-ng.component';
import { RoleNgService } from '../../../../../../main/webapp/app/entities/role-ng/role-ng.service';
import { RoleNg } from '../../../../../../main/webapp/app/entities/role-ng/role-ng.model';

describe('Component Tests', () => {

    describe('RoleNg Management Component', () => {
        let comp: RoleNgComponent;
        let fixture: ComponentFixture<RoleNgComponent>;
        let service: RoleNgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [RoleNgComponent],
                providers: [
                    RoleNgService
                ]
            })
            .overrideTemplate(RoleNgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleNgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleNgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new RoleNg(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.roles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
