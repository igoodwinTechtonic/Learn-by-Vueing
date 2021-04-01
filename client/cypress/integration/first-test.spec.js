describe('Login', () => {
  it('Should log in a user', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#login-btn').click()
    cy.contains('Continue with Google').click()
  })
})
