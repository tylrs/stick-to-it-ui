describe("Account User Flow", () => {
  beforeEach(() => {
    const today = new Date("2022/02/13");
    cy.interceptAllRequests().clock(today).visit("http://localhost:2000/");
  });

  it("Should be able to create an account and auto log in with that account", () => {
    cy.get("[href='/create-account'] > .account-link-wrapper")
      .click()
      .get(".account-page-header")
      .should("be.visible")
      .get("[name=name]")
      .type("Sample Bob")
      .get("[name=username]")
      .type("samplebob1")
      .get("[name=email]")
      .type("samplebob1@sample.com")
      .get("[name=password]")
      .type("123456")
      .get("[name=passwordConfirmation]")
      .type("123456")
      .get(".submit-account-creation")
      .click()
      .url()
      .should("include", "/all-habits")
      .get(".greeting-message")
      .should("have.text", "Welcome: Sample Bob");
  });

  it("Should show an error message if the account cannot be created", () => {
    cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/users", {
      ok: false,
      statusCode: 422,
      fixture: "accountCreationFail",
    }).as("accountCreationFail");
    cy.get("[href='/create-account'] > .account-link-wrapper")
      .click()
      .get("[name=name]")
      .type("Sample Bob")
      .get("[name=username]")
      .type("samplebob1")
      .get("[name=email]")
      .type("samplebob1@sample.com")
      .get("[name=password]")
      .type("123458")
      .get("[name=passwordConfirmation]")
      .type("123456")
      .get(".submit-account-creation")
      .click()
      .wait("@accountCreationFail")
      .get(".account-creation-error")
      .should("have.text", "Password confirmation doesn't match Password");
  });

  it("Should show an error if a form field isn't complete", () => {
    cy.get("[href='/create-account'] > .account-link-wrapper")
      .click()
      .get("[name=name]")
      .type("Sample Bob")
      .get(".submit-account-creation")
      .click()
      .get("input:invalid")
      .should("have.length", 4);
  });

  it("Should be able to log in ", () => {
    cy.logIn()
      .url()
      .should("include", "/all-habits")
      .get(".greeting-message")
      .should("have.text", "Welcome: Sample Bob");
  });

  it("Should be able to log out", () => {
    cy.logIn()
      .get(".log-out-button")
      .click()
      .url()
      .should("include", "/login")
      .get("[name=email]")
      .should("be.visible")
      .get("[name=password]")
      .should("be.visible");
  });
});
