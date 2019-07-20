// https://docs.cypress.io/api/introduction/api.html

describe('Component Testing', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
  })

  it('checks to see that a wrapper & masonry class exists', () => {
    cy.visit('/')
    .get('.wrapper').should('be.visible')
    .get('.masonry').should('be.visible');
  })
})
