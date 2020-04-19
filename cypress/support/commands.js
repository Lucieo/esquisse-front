// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('login', (email = 'admin@example.com', password = 'Passw0rd!') => {
    cy.visit('/')
    cy.get('[name="email"]').type(email)
    cy.get('[name="password"]').type(password)
    cy.contains('Valider').click()
})

Cypress.Commands.add('signup', (name = 'user1234', email = 'user@example.com', password = 'Passw0rd!') => {
    // cy.visit('/')
    // cy.contains('S\'inscrire').click()
    // cy.get('[name="username"]').type(nom)
    // cy.get('[name="email"]').type(email)
    // cy.get('[name="password"]').type(password)
    // cy.contains('S\'inscrire').click()

    cy.exec(`MONGO_URI=${Cypress.env('MONGO_URI')} npm run db:reset`)

    // seed a user in the DB that we can control from our tests
    const apiBaseUrl = Cypress.env('API_BASE_URL');
    const protocol = apiBaseUrl.includes('heroku') ? 'https' : 'http';
    cy.request('POST', `${protocol}://${apiBaseUrl}`, {
        operationName: 'SignUp',
        query: 'mutation SignUp($email: String!, $password: String!, $name: String!) {  signup(email: $email, password: $password, name: $name) {    email    name    __typename  }}',
        variables: {
            name,
            email,
            password
        }
    })
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
