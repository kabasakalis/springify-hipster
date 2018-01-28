/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpringifyTestModule } from '../../../test.module';
import { PlaylistNgDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/playlist-ng/playlist-ng-delete-dialog.component';
import { PlaylistNgService } from '../../../../../../main/webapp/app/entities/playlist-ng/playlist-ng.service';

describe('Component Tests', () => {

    describe('PlaylistNg Management Delete Component', () => {
        let comp: PlaylistNgDeleteDialogComponent;
        let fixture: ComponentFixture<PlaylistNgDeleteDialogComponent>;
        let service: PlaylistNgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [PlaylistNgDeleteDialogComponent],
                providers: [
                    PlaylistNgService
                ]
            })
            .overrideTemplate(PlaylistNgDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlaylistNgDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaylistNgService);
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
