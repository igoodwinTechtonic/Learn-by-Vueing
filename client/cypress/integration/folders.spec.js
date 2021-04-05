describe('Folder actions', () => {

  it('should delete a folder if it exists', () => {
    cy.get('a[href^="/folder/guardrails-setup/]').click()
  })

  it('should create a new folder', () => {
    cy.get('#new-folder-btn').click()
    cy.get('#new-folder-input').type('Guardrails Setup')
    cy.get('label[for*="new-folder-public-chbx"]').click()
    cy.get('#new-folder-icon').click().type('test')
    // cy.get('#new-folder-icon-list')
    cy.get('.v-virtual-scroll__item').as('icons').should('have.lengthOf', 3)
    cy.get('@icons').then((icons) => {
      const firstIcon = icons[0]
      cy.get(firstIcon).click()
    })
    // cy.get('#new-folder-submit-btn').click()
  })
})