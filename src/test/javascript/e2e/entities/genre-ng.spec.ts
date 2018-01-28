import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Genre e2e test', () => {

    let navBarPage: NavBarPage;
    let genreDialogPage: GenreDialogPage;
    let genreComponentsPage: GenreComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Genres', () => {
        navBarPage.goToEntity('genre-ng');
        genreComponentsPage = new GenreComponentsPage();
        expect(genreComponentsPage.getTitle())
            .toMatch(/springifyApp.genre.home.title/);

    });

    it('should load create Genre dialog', () => {
        genreComponentsPage.clickOnCreateButton();
        genreDialogPage = new GenreDialogPage();
        expect(genreDialogPage.getModalTitle())
            .toMatch(/springifyApp.genre.home.createOrEditLabel/);
        genreDialogPage.close();
    });

    it('should create and save Genres', () => {
        genreComponentsPage.clickOnCreateButton();
        genreDialogPage.setNameInput('name');
        expect(genreDialogPage.getNameInput()).toMatch('name');
        genreDialogPage.save();
        expect(genreDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GenreComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-genre-ng div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GenreDialogPage {
    modalTitle = element(by.css('h4#myGenreLabel'));
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
