/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpringifyTestModule } from '../../../test.module';
import { RoleNgDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/role-ng/role-ng-delete-dialog.component';
import { RoleNgService } from '../../../../../../main/webapp/app/entities/role-ng/role-ng.service';

describe('Component Tests', () => {

    describe('RoleNg Management Delete Component', () => {
        let comp: RoleNgDeleteDialogComponent;
        let fixture: ComponentFixture<RoleNgDeleteDialogComponent>;
        let service: RoleNgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [RoleNgDeleteDialogComponent],
                providers: [
                    RoleNgService
                ]
            })
            .overrideTemplate(RoleNgDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleNgDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleNgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
