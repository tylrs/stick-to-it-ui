Cypress.Commands.add("logIn", () => {
    cy
        .get(".to-log-in")
        .click()
        .get("[name=email]")
        .type("samplebob1@sample.com")
        .get("[name=password]")
        .type("123456")
        .get(".submit-login")
        .click()
        .wait("@Log In")
})