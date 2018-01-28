import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Playlist e2e test', () => {

    let navBarPage: NavBarPage;
    let playlistDialogPage: PlaylistDialogPage;
    let playlistComponentsPage: PlaylistComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Playlists', () => {
        navBarPage.goToEntity('playlist-ng');
        playlistComponentsPage = new PlaylistComponentsPage();
        expect(playlistComponentsPage.getTitle())
            .toMatch(/springifyApp.playlist.home.title/);

    });

    it('should load create Playlist dialog', () => {
        playlistComponentsPage.clickOnCreateButton();
        playlistDialogPage = new PlaylistDialogPage();
        expect(playlistDialogPage.getModalTitle())
            .toMatch(/springifyApp.playlist.home.createOrEditLabel/);
        playlistDialogPage.close();
    });

    it('should create and save Playlists', () => {
        playlistComponentsPage.clickOnCreateButton();
        playlistDialogPage.setNameInput('name');
        expect(playlistDialogPage.getNameInput()).toMatch('name');
        playlistDialogPage.save();
        expect(playlistDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PlaylistComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-playlist-ng div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PlaylistDialogPage {
    modalTitle = element(by.css('h4#myPlaylistLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
