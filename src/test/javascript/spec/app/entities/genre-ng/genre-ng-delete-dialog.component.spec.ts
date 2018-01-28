/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpringifyTestModule } from '../../../test.module';
import { GenreNgDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng-delete-dialog.component';
import { GenreNgService } from '../../../../../../main/webapp/app/entities/genre-ng/genre-ng.service';

describe('Component Tests', () => {

    describe('GenreNg Management Delete Component', () => {
        let comp: GenreNgDeleteDialogComponent;
        let fixture: ComponentFixture<GenreNgDeleteDialogComponent>;
        let service: GenreNgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [GenreNgDeleteDialogComponent],
                providers: [
                    GenreNgService
                ]
            })
            .overrideTemplate(GenreNgDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GenreNgDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenreNgService);
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
