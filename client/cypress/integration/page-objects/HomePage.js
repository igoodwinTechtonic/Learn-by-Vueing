class HomePage {
  constructor() {}

  visit() {
    cy.visit('http://localhost:3000')
  }
  login() {
    cy.get('#login-btn').should('exist', true).click()
  }
  loginWithGoogle() {
    cy.contains('Continue with Google').should('exist', true).click()
  }
}

export default HomePage
