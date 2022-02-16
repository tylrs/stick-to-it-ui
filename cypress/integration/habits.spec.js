describe.only("User Habit Creation, Viewing, and Deleting", () => {
  beforeEach(() => {
    cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/auth/login", {
      ok: true,
      statusCode: 200,
      fixture: "loginResponse1",
    }).as("Log In");

    cy.intercept(
      "GET",
      "https://stick-to-it-api.herokuapp.com/users/**/habits",
      {
        ok: true,
        statusCode: 200,
        fixture: "allHabitsResponse",
      }
    ).as("Get User Habits");

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

    const today = new Date("2022/02/15");
    cy.clock(today).visit("http://localhost:2000/").logIn();
  });

  it("Should be able to view existing habits", () => {
    cy.get(".habit-container-all").should("have.length", 3);
  });

  it("Should be able to create a new habit and see it in all habits", () => {
    cy.get(".create-new-habit-button")
      .click()
      .url()
      .should("include", "/create-habit")
      .get("[name=name]")
      .type("Eat healthy")
      .get("[name=description]")
      .type("Weekdays")
      .get("#start-date-input")
      .type("2022/02/16")
      .get("#end-date-input")
      .type("2022/02/17")
      .intercept(
        "GET",
        "https://stick-to-it-api.herokuapp.com/users/**/habits",
        {
          ok: true,
          statusCode: 200,
          fixture: "newAllHabitsResponse",
        }
      )
      .as("Get User Habits After Update")
      .get(".submit-habit-creation")
      .click()
      .wait("@Create New Habit")
      .wait("@Get User Habits After Update")
      .get(".habit-container-all")
      .should("have.length", 4)
      .get(".habit-name")
      .eq(3)
      .should("have.text", "Eat healthy")
      .get(".message-container")
      .should("have.text", "New Habit Created");
  });

  it("Should be able to delete a habit", () => {
    cy.get(".habit-container-all")
      .should("have.length", 3)
      .get(".habit-name")
      .eq(2)
      .should("have.text", "Running")
      .get(".habit-delete-button")
      .eq(2)
      .click()
      .get(".habit-container-all")
      .should("have.length", 2);
  });

  it("Should have checkboxes take different states depending on habit log info", () => {
    cy.get(".log-checkbox")
      .eq(0)
      .should("be.disabled")
      .get(".log-checkbox")
      .eq(1)
      .should("not.be.disabled")
      .should("be.checked")
      .get(".log-checkbox")
      .eq(2)
      .should("not.be.disabled")
      .should("be.checked")
      .get(".log-checkbox")
      .eq(3)
      .should("not.be.disabled")
      .should("not.be.checked");
  });

  it("Should be able to mark a habit log as complete", () => {
    cy.intercept(
      "PATCH",
      "https://stick-to-it-api.herokuapp.com/users/**/habits/**/habit_logs/**",
      {
        ok: true,
        statusCode: 200,
        fixture: "completedHabitLog",
      }
    ).as("Mark Habit Complete");

    cy.get(".log-checkbox")
      .eq(3)
      .check()
      .wait("@Mark Habit Complete")
      .get(".message-container")
      .should("have.text", "Habit Marked Complete")
      .get(".log-checkbox")
      .eq(3)
      .should("be.checked");
  });

  it("Should be able to mark a habit log as incomplete", () => {
    cy.intercept(
      "PATCH",
      "https://stick-to-it-api.herokuapp.com/users/**/habits/**/habit_logs/**",
      {
        ok: true,
        statusCode: 200,
        fixture: "incompleteHabitLog",
      }
    ).as("Mark Habit Incomplete");

    cy.get(".log-checkbox")
      .eq(2)
      .uncheck()
      .wait("@Mark Habit Incomplete")
      .get(".message-container")
      .should("have.text", "Habit Marked Incomplete")
      .get(".log-checkbox")
      .eq(2)
      .should("not.be.checked");
  });

  it("Should style today's checkbox differently", () => {
    cy.get(".habit-log-container").eq(2).should("have.class", "today-marker");
  });
});
