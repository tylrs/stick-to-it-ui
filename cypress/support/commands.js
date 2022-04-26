import { successLoginResponse } from "../factories/successLoginResponse";

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
  cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/api/v2/users", {
    ok: true,
    statusCode: 201,
    fixture: "newAccountResponse",
  }).as("Create Account");

  cy.intercept(
    "POST",
    "https://stick-to-it-api.herokuapp.com/api/v2/auth/login",
    successLoginResponse
  ).as("Log In");

  cy.intercept(
    "GET",
    "https://stick-to-it-api.herokuapp.com/api/v2/users/**/habit_plans/week",
    {
      ok: true,
      statusCode: 200,
      fixture: "allHabitsResponse",
    }
  ).as("Get User Habits");

  cy.intercept(
    "POST",
    "https://stick-to-it-api.herokuapp.com/api/v2/auth/login",
    {
      ok: true,
      statusCode: 200,
      fixture: "loginResponse1",
    }
  ).as("Log In");

  cy.intercept(
    "GET",
    "https://stick-to-it-api.herokuapp.com/api/v2/users/**/habit_plans/week",
    {
      ok: true,
      statusCode: 200,
      fixture: "allHabitsResponse",
    }
  ).as("Get User Habits");

  cy.intercept(
    "POST",
    "https://stick-to-it-api.herokuapp.com/api/v2/users/**/habits",
    {
      ok: true,
      statusCode: 201,
      fixture: "newHabitResponse",
    }
  ).as("Create New Habit");

  cy.intercept(
    "DELETE",
    "https://stick-to-it-api.herokuapp.com/api/v2/users/**/habit_plans/**",
    {
      ok: true,
      statusCode: 204,
    }
  ).as("Delete Habit Plan");
});
