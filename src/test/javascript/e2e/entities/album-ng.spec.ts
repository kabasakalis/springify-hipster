import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Album e2e test', () => {

    let navBarPage: NavBarPage;
    let albumDialogPage: AlbumDialogPage;
    let albumComponentsPage: AlbumComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Albums', () => {
        navBarPage.goToEntity('album-ng');
        albumComponentsPage = new AlbumComponentsPage();
        expect(albumComponentsPage.getTitle())
            .toMatch(/springifyApp.album.home.title/);

    });

    it('should load create Album dialog', () => {
        albumComponentsPage.clickOnCreateButton();
        albumDialogPage = new AlbumDialogPage();
        expect(albumDialogPage.getModalTitle())
            .toMatch(/springifyApp.album.home.createOrEditLabel/);
        albumDialogPage.close();
    });

    it('should create and save Albums', () => {
        albumComponentsPage.clickOnCreateButton();
        albumDialogPage.setTitleInput('title');
        expect(albumDialogPage.getTitleInput()).toMatch('title');
        albumDialogPage.setYearInput('year');
        expect(albumDialogPage.getYearInput()).toMatch('year');
        // albumDialogPage.playlistSelectLastOption();
        albumDialogPage.artistSelectLastOption();
        albumDialogPage.save();
        expect(albumDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AlbumComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-album-ng div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AlbumDialogPage {
    modalTitle = element(by.css('h4#myAlbumLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    yearInput = element(by.css('input#field_year'));
    playlistSelect = element(by.css('select#field_playlist'));
    artistSelect = element(by.css('select#field_artist'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    }

    setYearInput = function(year) {
        this.yearInput.sendKeys(year);
    }

    getYearInput = function() {
        return this.yearInput.getAttribute('value');
    }

    playlistSelectLastOption = function() {
        this.playlistSelect.all(by.tagName('option')).last().click();
    }

    playlistSelectOption = function(option) {
        this.playlistSelect.sendKeys(option);
    }

    getPlaylistSelect = function() {
        return this.playlistSelect;
    }

    getPlaylistSelectedOption = function() {
        return this.playlistSelect.element(by.css('option:checked')).getText();
    }

    artistSelectLastOption = function() {
        this.artistSelect.all(by.tagName('option')).last().click();
    }

    artistSelectOption = function(option) {
        this.artistSelect.sendKeys(option);
    }

    getArtistSelect = function() {
        return this.artistSelect;
    }

    getArtistSelectedOption = function() {
        return this.artistSelect.element(by.css('option:checked')).getText();
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
