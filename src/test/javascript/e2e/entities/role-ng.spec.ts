import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Role e2e test', () => {

    let navBarPage: NavBarPage;
    let roleDialogPage: RoleDialogPage;
    let roleComponentsPage: RoleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Roles', () => {
        navBarPage.goToEntity('role-ng');
        roleComponentsPage = new RoleComponentsPage();
        expect(roleComponentsPage.getTitle())
            .toMatch(/springifyApp.role.home.title/);

    });

    it('should load create Role dialog', () => {
        roleComponentsPage.clickOnCreateButton();
        roleDialogPage = new RoleDialogPage();
        expect(roleDialogPage.getModalTitle())
            .toMatch(/springifyApp.role.home.createOrEditLabel/);
        roleDialogPage.close();
    });

    it('should create and save Roles', () => {
        roleComponentsPage.clickOnCreateButton();
        roleDialogPage.setNameInput('name');
        expect(roleDialogPage.getNameInput()).toMatch('name');
        roleDialogPage.save();
        expect(roleDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RoleComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-role-ng div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RoleDialogPage {
    modalTitle = element(by.css('h4#myRoleLabel'));
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
