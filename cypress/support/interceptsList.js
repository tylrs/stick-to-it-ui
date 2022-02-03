//Create Account
cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/users", {
    ok: true,
    statusCode: 201, 
    fixture: "newAccountResponse"
}).as("Create Account")

//Log In
cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/auth/login", {
    ok: true,
    statusCode: 200, 
    fixture: "loginResponse1"
}).as("Log In")

//Create New Habit
cy.intercept("POST", "https://stick-to-it-api.herokuapp.com/users/**/habits", {
    ok: true,
    statusCode: 201, 
    fixture: "newHabitResponse"
}).as("Create New Habit")

//Get Habits From One User
cy.intercept("GET", "https://stick-to-it-api.herokuapp.com/users/**/habits", {
    ok: true,
    statusCode: 200, 
    fixture: "allHabitsResponse"
}).as("Get User Habits")

//Get Habits After Adding One Habit
cy.intercept("GET", "https://stick-to-it-api.herokuapp.com/users/**/habits", {
    ok: true,
    statusCode: 200, 
    fixture: "newAllHabitsResponse"
}).as("Get User Habits After Update")

//Delete Habit
cy.intercept("DELETE", "https://stick-to-it-api.herokuapp.com/users", {
    ok: true,
    statusCode: 204
}).as("Create Account")