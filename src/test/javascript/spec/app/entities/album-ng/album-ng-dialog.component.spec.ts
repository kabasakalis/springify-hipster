/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpringifyTestModule } from '../../../test.module';
import { AlbumNgDialogComponent } from '../../../../../../main/webapp/app/entities/album-ng/album-ng-dialog.component';
import { AlbumNgService } from '../../../../../../main/webapp/app/entities/album-ng/album-ng.service';
import { AlbumNg } from '../../../../../../main/webapp/app/entities/album-ng/album-ng.model';
import { PlaylistNgService } from '../../../../../../main/webapp/app/entities/playlist-ng';
import { ArtistNgService } from '../../../../../../main/webapp/app/entities/artist-ng';

describe('Component Tests', () => {

    describe('AlbumNg Management Dialog Component', () => {
        let comp: AlbumNgDialogComponent;
        let fixture: ComponentFixture<AlbumNgDialogComponent>;
        let service: AlbumNgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [AlbumNgDialogComponent],
                providers: [
                    PlaylistNgService,
                    ArtistNgService,
                    AlbumNgService
                ]
            })
            .overrideTemplate(AlbumNgDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumNgDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlbumNgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AlbumNg(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.album = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'albumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AlbumNg();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.album = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'albumListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
