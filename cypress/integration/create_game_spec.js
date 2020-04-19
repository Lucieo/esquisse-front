/* eslint-disable no-unused-expressions */
describe('Créer une partie', () => {
    const user = Cypress.env('user');
    beforeEach(() => {
        cy.signup(user.name, user.email, user.password)
        cy.login(user.email, user.password)
    })

    it('le temps alloué à chaque phase de jeu est affiché dans la section des règles', function () {
        cy.contains('NOUVELLE PARTIE').click()
        cy.get('[data-cy-id=init-time]').invoke('text').should('eq', '1mn')
        cy.get('[data-cy-id=drawing-time]').invoke('text').should('eq', '1mn30')
        cy.get('[data-cy-id=guessing-time]').invoke('text').should('eq', '1mn')
    })
})
