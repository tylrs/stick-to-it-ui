describe.only("User Habit Creation, Viewing, and Deleting", () => {
  beforeEach(() => {
    const today = new Date("2022/02/15");
    cy.interceptAllRequests()
      .clock(today)
      .visit("http://localhost:2000/")
      .logIn();
  });

  it("Should be able to view existing habits", () => {
    cy.get(".habit-container-all").should("have.length", 3);
  });

  it("Should show a user's current habit plan date range", () => {
    cy.get(".habit-plan-date-range")
      .eq(0)
      .should("have.text", "Current Habit Plan: 2/13/2022-2/18/2022");
  });

  it("Should be able to view a partner's habit plans", () => {
    cy.get(".habit-container-all")
      .eq(0)
      .within($habit => {
        cy.get(".habit-plan").should("have.length", 2);
      });
    cy.get(".habit-log-header")
      .eq(1)
      .should("have.text", "Sample John Progress This Week:");
  });

  it("Should show the current user's habit plan above partners", () => {
    cy.get(".habit-log-header")
      .eq(0)
      .should("have.text", "Your Progress This Week:");
  });

  it("Should indicate the current day correctly above habit logs", () => {
    cy.get(".habit-log-container")
      .eq(2)
      .should("have.class", "today-marker")
      .window()
      .then(win => {
        cy.get(".habit-log-container")
          .eq(2)
          .then(log => {
            const before = win.getComputedStyle(log[0], "::before");
            const beforeContent = before.getPropertyValue("content");
            expect(beforeContent).to.equal('"Today"');
          });
      });
  });

  it("Should be able to create a new habit and see it in habits week", () => {
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
        "https://stick-to-it-api.herokuapp.com/api/v2/users/**/habit_plans/week",
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

  it.only("Should be able to delete a habit", () => {
    cy.get(".habit-container-all")
      .should("have.length", 3)
      .get(".habit-name")
      .eq(2)
      .should("have.text", "Running")
      .intercept(
        "GET",
        "https://stick-to-it-api.herokuapp.com/api/v2/users/**/habit_plans/week",
        {
          ok: true,
          statusCode: 200,
          fixture: "allHabitsResponseAfterDeletion",
        }
      )
      .as("Get User Habits After Delete")
      .get(".habit-plan-delete-button")
      .eq(2)
      .click()
      .wait("@Delete Habit")
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
      "https://stick-to-it-api.herokuapp.com/api/v2/users/**/habit_plans/**/habit_logs/**",
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
      "https://stick-to-it-api.herokuapp.com/api/v2/users/**/habit_plans/**/habit_logs/**",
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
});
