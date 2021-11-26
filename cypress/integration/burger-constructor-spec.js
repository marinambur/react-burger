describe("Home page tests", () => {
    beforeEach(function () {
        cy.viewport(1300, 800);
        cy.visit("http://localhost:3000");
        cy.wait(500);
    });

    it("should open and close popup", () => {
        cy.contains("Краторная булка N-200i").click();
        cy.contains("Детали ингредиента").should("exist");
        cy.get("#popup").contains("Краторная булка N-200i").should("exist");
        cy.get("body").type(`{esc}`);
        cy.get("#popup").should("not.exist");
    });

    it("should drag and drop items, then make an order, then close modal window", () => {
        cy.contains("Флюоресцентная булка R2-D3").trigger("dragstart");
        cy.get("#box").trigger("drop");
        cy.get("#box").contains("Флюоресцентная булка R2-D3").should("exist");
        cy.contains("Оформить заказ").click();
        cy.get('[class^=login_form__]').as("auth-form");
        cy.get('@auth-form').find('[class^=text]').first().as('email-input');
        cy.get('@auth-form').find('[class^=input__icon]').first().click();
        cy.get('@email-input').type('m@m67.ru555');
        cy.get('@auth-form').find('[class^=text]').last().as('password-input').type('123456');
        cy.get('button').contains('Войти').click();
        cy.contains("Флюоресцентная булка R2-D3").trigger("dragstart");
        cy.get("#box").trigger("drop");
        cy.contains("Флюоресцентная булка R2-D3").trigger("dragend");
        cy.get("#box").contains("Флюоресцентная булка R2-D3").should("exist");
        cy.contains("Оформить заказ").click();
        cy.wait(15000);
        cy.contains("Идентификатор заказа").should("exist");
        cy.get("#closeButton").click();
        cy.get("#popup").should("not.exist");

    });
});