// Page-object models do NOT use any cy.get
// Instead put the HTML elements in a class in a separate file!

// Though I feel page-object model would bloat what I currently
// have here, almost every cy.get is a new element!

// One describe per file
// One it is one test
describe('Folder actions', () => {

  // You will have to log in your Google account before the first time running the test
  it('Should nav to home page and log in', () => {
    cy.visit('http://localhost:3000')
    cy.get('#login-btn').should('exist', true).click()
    cy.contains('Continue with Google').click()
  })

  it('Should delete the Cypress Testing folder', () => {
    cy.get('a[href^="/folder/cypress-testing"]').click()
    cy.get('.delete-button').click()
    cy.get('#delete-folder-submit-btn').click()
    cy.get('a[href^="/folder/cypress-testing"]').should('not.exist')
  })

  it('Should create a new folder', () => {
    cy.get('#new-folder-btn').click()
    // I can't assert this should have the text "Cypress Testing" because it's contained within a #shadow-root (user-agent) element
    cy.get('#new-folder-input').type('Cypress Testing')// .should('contain.html', '<div>Cypress Testing</div>')
    cy.get('label[for*="new-folder-public-chbx"]').click()
    cy.get('#new-folder-public-chbx').should('be.checked')
    cy.get('#new-folder-icon').click().type('test')//.should('contain.html', '<div>test</div>')
    cy.get('.v-virtual-scroll__item').as('icons').should('have.lengthOf', 3)
    cy.get('@icons').then((icons) => {
      const firstIcon = icons[0]
      cy.get(firstIcon).click()
      // Retrieve the icon's svg path to verify the correct icon is loaded in DOM
      cy.get('path[d*="M7,2V4H8V18A4,4 0 0,0 12,22A4,4 0 0,0 16,18V4H17V2H7M11,16C10.4,16 10,15.6 10,15C10,14.4 10.4,14 11,14C11.6,14 12,14.4 12,15C12,15.6 11.6,16 11,16M13,12C12.4,12 12,11.6 12,11C12,10.4 12.4,10 13,10C13.6,10 14,10.4 14,11C14,11.6 13.6,12 13,12M14,7H10V4H14V7Z"]')
        .should('exist')
    })
    cy.get('#new-folder-submit-btn').click()
    cy.get('#nav-drawer-folders-list').should('have.length.at.least', 1)
  })

  it('Should add a bookmark to Cypress Testing', () => {
    cy.get('a[href^="/folder/cypress-testing"]').click()
    cy.get('#add-search-field').click().paste({
      pasteType: 'text/plain',
      pastePayload: 'https://docs.atlassian.com/jira-software/REST/7.0.4/#agile/1.0/board-getAllBoards'
    })
    cy.get('#add-search-field').should('contain.text', '')
    cy.wait(2000)
    cy.get('#add-bookmark-title')
      .click()
      .type(' API - getAllBoards')
      .should('have.value', 'JIRA Agile 7.0.4 API - getAllBoards')
    cy.get('#add-bookmark-description')
      .click()
      .type('This is the reference document for the REST API and resources provided by JIRA Agile.{enter}{enter}Returns all boards. This only includes boards that the user has permission to view.')
      .should('have.value', 'This is the reference document for the REST API and resources provided by JIRA Agile.\n\nReturns all boards. This only includes boards that the user has permission to view.')
    cy.get('div[role="combobox"]')
      .click()
      .should('have.attr', 'aria-expanded', 'true')
      .type('Jira{enter}')
    cy.contains('API').click()
    cy.get('.v-chip__content').should('have.length', 2)
    cy.get('.v-main__wrap').click('right') // click outside the menu to hide it
    cy.get('div[role="combobox"]').should('have.attr', 'aria-expanded', 'false')
    cy.get('#add-bookmark-btn').click()
  })

  it('Should copy the public folder link, log out, and navigate to it', () => {
    cy.get('a[href^="/folder/cypress-testing"]').click()
    cy.get('#copy-link-btn').click()
    cy.wait(1000)
    // The "copy link for public folder" doesn't work 100% of the time, and I'm not sure why
    // I think it's a problem with Cypress and clipboardy, not the app itself.
    // It's getting an older link that was copied to the clipboard, not the new one...
    // Even cy.log prints the old url, not the new one!
    // You can see the two different urls by hovering the mouse over step 7 in the last test,
    // and looking at the address bar.
    cy.task('getClipboard').then(($clip) => {
      cy.log('this is what was in clipboard', $clip)
      cy.get('#logout-btn').click()
      cy.visit($clip)
      // Should display the bookmarks!
      cy.get('.folder-name').should('have.text', ' Cypress Testing ') // Vuetify pads this with spaces!
      cy.get('a[role="listitem"]').should('have.attr', 'href', 'https://docs.atlassian.com/jira-software/REST/7.0.4/#agile/1.0/board-getAllBoards')
    })
  })

})
