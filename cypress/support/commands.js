Cypress.Commands.add("logIn", () => {
  cy.get(".to-log-in")
    .click()
    .get("[name=email]")
    .type("samplebob1@sample.com")
    .get("[name=password]")
    .type("123456")
    .get(".submit-login")
    .click()
    .wait("@Log In")
    .wait("@Get User Habits");
});

Cypress.Commands.add("interceptAllRequests", () => {
  cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/users", {
    ok: true,
    statusCode: 201,
    fixture: "newAccountResponse",
  }).as("Create Account");

  cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/auth/login", {
    ok: true,
    statusCode: 200,
    fixture: "loginResponse1",
  }).as("Log In");

  cy.intercept("GET", "https://stick-to-it-api.herokuapp.com/users/**/habits", {
    ok: true,
    statusCode: 200,
    fixture: "allHabitsResponse",
  }).as("Get User Habits");

  cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/auth/login", {
    ok: true,
    statusCode: 200,
    fixture: "loginResponse1",
  }).as("Log In");

  cy.intercept("GET", "https://stick-to-it-api.herokuapp.com/users/**/habits", {
    ok: true,
    statusCode: 200,
    fixture: "allHabitsResponse",
  }).as("Get User Habits");

  cy.intercept(
    "POST",
    "https://stick-to-it-api.herokuapp.com/users/**/habits",
    {
      ok: true,
      statusCode: 201,
      fixture: "newHabitResponse",
    }
  ).as("Create New Habit");

  cy.intercept(
    "DELETE",
    "https://stick-to-it-api.herokuapp.com/users/**/habits/**",
    {
      ok: true,
      statusCode: 204,
    }
  ).as("Delete Habit");
});
