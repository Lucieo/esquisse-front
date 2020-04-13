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

Cypress.Commands.add('signup', (nom = 'user1234', email = 'user@example.com', password = 'Passw0rd!') => {
    cy.visit('/')
    cy.contains('S\'inscrire').click()
    cy.get('[placeholder="nom"]').type(nom)
    cy.get('[name="email"]').type(email)
    cy.get('[name="password"]').type(password)
    cy.contains('S\'inscrire').click()
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
