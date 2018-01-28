/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpringifyTestModule } from '../../../test.module';
import { ArtistNgDialogComponent } from '../../../../../../main/webapp/app/entities/artist-ng/artist-ng-dialog.component';
import { ArtistNgService } from '../../../../../../main/webapp/app/entities/artist-ng/artist-ng.service';
import { ArtistNg } from '../../../../../../main/webapp/app/entities/artist-ng/artist-ng.model';
import { GenreNgService } from '../../../../../../main/webapp/app/entities/genre-ng';

describe('Component Tests', () => {

    describe('ArtistNg Management Dialog Component', () => {
        let comp: ArtistNgDialogComponent;
        let fixture: ComponentFixture<ArtistNgDialogComponent>;
        let service: ArtistNgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpringifyTestModule],
                declarations: [ArtistNgDialogComponent],
                providers: [
                    GenreNgService,
                    ArtistNgService
                ]
            })
            .overrideTemplate(ArtistNgDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArtistNgDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArtistNgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ArtistNg(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.artist = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'artistListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ArtistNg();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.artist = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'artistListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
