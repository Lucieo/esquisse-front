/* eslint-disable no-unused-expressions */
describe('The Login Page', () => {
    const user = Cypress.env('user');
    beforeEach(() => {
        cy.exec(`MONGO_URI=${Cypress.env('MONGO_URI')} npm run db:reset`)

        // seed a user in the DB that we can control from our tests
        const apiBaseUrl = Cypress.env('API_BASE_URL');
        const protocol = apiBaseUrl.includes('heroku') ? 'https' : 'http';
        cy.request('POST', `${protocol}://${apiBaseUrl}`, {
            operationName: 'SignUp',
            query: 'mutation SignUp($email: String!, $password: String!, $name: String!) {  signup(email: $email, password: $password, name: $name) {    email    name    __typename  }}',
            variables: user
        })

    })

    it('sets JWT when logging in via form submission', function () {
        cy.visit('/login')

        cy.get('input[name=email]').type(user.email)
        cy.get('input[name=password]').type(`${user.password}{enter}`)

        // we should be redirected to /dashboard
        cy.url().should('include', '/')

        // UI should reflect this user being logged in
        cy.get('h4').should('contain', user.name).then(() => {
            // JWT should be stored
            expect(localStorage.getItem('esquisse-token')).to.match(/^Bearer [A-Za-z0-9-_=]{4,}\.[A-Za-z0-9-_=]{4,}\.?[A-Za-z0-9-_.+/=]{4,}$/i)
        })
    })
})
