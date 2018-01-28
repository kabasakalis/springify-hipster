/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpringifyTestModule } from '../../../test.module';
import { RoleNgDialogComponent } from '../../../../../../main/webapp/app/entities/role-ng/role-ng-dialog.component';
import { RoleNgService } from '../../../../../../main/webapp/app/entities/role-ng/role-ng.service';
import { RoleNg } from '../../../../../../main/webapp/app/entities/role-ng/role-ng.model';

describe('Component Tests', () => {

    describe('RoleNg Management Dialog Component', () => {
        let comp: RoleNgDialogComponent;
        let fixture: ComponentFixture<RoleNgDialogComponent>;
        let service: RoleNgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [RoleNgDialogComponent],
                providers: [
                    RoleNgService
                ]
            })
            .overrideTemplate(RoleNgDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleNgDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleNgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoleNg(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.role = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'roleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RoleNg();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.role = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'roleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
