describe('Folder actions', () => {

  it('Should set up the tests', () => {
    cy.visit('http://localhost:3000')
    cy.get('#login-btn').click()
  })

  // it('Should delete the Cypress Testing folder if it exists', () => {
  //   cy.visit('http://localhost:3000')
  //   cy.get('#login-btn').click()
  //   // cy.get('button[type*="submit"]').click()
  //   cy.get('a[href^="/folder/cypress-testing"]').as('folderToDelete')
  //   cy.get('@folderToDelete').then((folder) => {
  //     const folderToDelete = folder[0]
  //     if (folderToDelete) {
  //       folderToDelete.click()
  //       cy.get('.delete-button').click()
  //       cy.get('#delete-folder-submit-btn').click()
  //     }
  //   })
  // })

  // it('Should create a new folder', () => {
  //   cy.get('#new-folder-btn').click()
  //   cy.get('#new-folder-input').type('Cypress Testing')
  //   cy.get('label[for*="new-folder-public-chbx"]').click()
  //   cy.get('#new-folder-icon').click().type('test')
  //   // cy.get('#new-folder-icon-list');
  //   cy.get('.v-virtual-scroll__item').as('icons').should('have.lengthOf', 3)
  //   cy.get('@icons').then((icons) => {
  //     const firstIcon = icons[0]
  //     cy.get(firstIcon).click()
  //   })
  //   cy.get('#new-folder-submit-btn').click()
  // })

  it('Should add a bookmark to Cypress Testing', () => {
    cy.get('a[href^="/folder/cypress-testing"]').click()
    cy.get('#add-search-field').click().paste({
      pasteType: 'application/text',
      pastePayload: 'https://docs.atlassian.com/jira-software/REST/7.0.4/#agile/1.0/board-getAllBoards'
    })
    // cy.get('#add-search-field').click().trigger('paste', { eventConstructor: 'ClipboardEvent' })
    //.type('{cmd}{v}')
  })

  // it('Should copy the public folder link, log out, and navigate to it', () => {
  //   cy.get('a[href^="/folder/cypress-testing"]').click()
  //   cy.get('#copy-link-btn').click()
  //   cy.task('getClipboard').then(($clip) => {
  //     const url = $clip
  //     cy.log('this is what was in clipboard', url)
  //     // cy.get('#logout-btn').click()
  //     // cy.visit(url)
  //   })
  // })

})
