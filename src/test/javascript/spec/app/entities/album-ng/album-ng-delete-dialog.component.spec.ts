/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpringifyTestModule } from '../../../test.module';
import { AlbumNgDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/album-ng/album-ng-delete-dialog.component';
import { AlbumNgService } from '../../../../../../main/webapp/app/entities/album-ng/album-ng.service';

describe('Component Tests', () => {

    describe('AlbumNg Management Delete Component', () => {
        let comp: AlbumNgDeleteDialogComponent;
        let fixture: ComponentFixture<AlbumNgDeleteDialogComponent>;
        let service: AlbumNgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [AlbumNgDeleteDialogComponent],
                providers: [
                    AlbumNgService
                ]
            })
            .overrideTemplate(AlbumNgDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumNgDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlbumNgService);
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
