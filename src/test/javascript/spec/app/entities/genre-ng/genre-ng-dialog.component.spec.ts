/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpringifyTestModule } from '../../../test.module';
import { GenreNgDialogComponent } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng-dialog.component';
import { GenreNgService } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng.service';
import { GenreNg } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng.model';

describe('Component Tests', () => {

    describe('GenreNg Management Dialog Component', () => {
        let comp: GenreNgDialogComponent;
        let fixture: ComponentFixture<GenreNgDialogComponent>;
        let service: GenreNgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [GenreNgDialogComponent],
                providers: [
                    GenreNgService
                ]
            })
            .overrideTemplate(GenreNgDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GenreNgDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenreNgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GenreNg(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.genre = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'genreListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GenreNg();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.genre = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'genreListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
