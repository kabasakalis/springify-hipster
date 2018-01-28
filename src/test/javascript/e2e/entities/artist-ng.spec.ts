import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Artist e2e test', () => {

    let navBarPage: NavBarPage;
    let artistDialogPage: ArtistDialogPage;
    let artistComponentsPage: ArtistComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Artists', () => {
        navBarPage.goToEntity('artist-ng');
        artistComponentsPage = new ArtistComponentsPage();
        expect(artistComponentsPage.getTitle())
            .toMatch(/springifyApp.artist.home.title/);

    });

    it('should load create Artist dialog', () => {
        artistComponentsPage.clickOnCreateButton();
        artistDialogPage = new ArtistDialogPage();
        expect(artistDialogPage.getModalTitle())
            .toMatch(/springifyApp.artist.home.createOrEditLabel/);
        artistDialogPage.close();
    });

    it('should create and save Artists', () => {
        artistComponentsPage.clickOnCreateButton();
        artistDialogPage.setNameInput('name');
        expect(artistDialogPage.getNameInput()).toMatch('name');
        artistDialogPage.setCountryInput('country');
        expect(artistDialogPage.getCountryInput()).toMatch('country');
        artistDialogPage.genreSelectLastOption();
        artistDialogPage.save();
        expect(artistDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ArtistComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-artist-ng div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ArtistDialogPage {
    modalTitle = element(by.css('h4#myArtistLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    countryInput = element(by.css('input#field_country'));
    genreSelect = element(by.css('select#field_genre'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    }

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    }

    genreSelectLastOption = function() {
        this.genreSelect.all(by.tagName('option')).last().click();
    }

    genreSelectOption = function(option) {
        this.genreSelect.sendKeys(option);
    }

    getGenreSelect = function() {
        return this.genreSelect;
    }

    getGenreSelectedOption = function() {
        return this.genreSelect.element(by.css('option:checked')).getText();
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
