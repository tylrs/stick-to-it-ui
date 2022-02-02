describe("Account User Flow", () => {
    beforeEach(() => {
        cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/users", {
            ok: true,
            statusCode: 201, 
            fixture: "newAccountResponse"
        }).as("Create Account")

        cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/auth/login", {
            ok: true,
            statusCode: 200, 
            fixture: "loginResponse1"
        }).as("Log In")

        cy.visit("http://localhost:2000/")
    })

    it("Should be able to create an account ", () => {
        cy
            .get('[href="/create-account"] > .account-link-wrapper')
            .click()
            .get(".account-page-header")
            .should("be.visible")
            .get('[name="name"]')
            .type("Sample Bob")
            .get('[name="username"]')
            .type("samplebob1")
            .get('[name="email"]')
            .type("samplebob1@sample.com")
            .get('[name="password"]')
            .type("123456")
            .get('[name="passwordConfirmation"]')
            .type("123456")
            .get(".submit-account-creation")
            .click()
            .wait("@Log In")  
            .url()
            .should("include", "/all-habits")
            .get(".greeting-message")
            .should("have.text", "Welcome: Sample Bob")       
    })
})