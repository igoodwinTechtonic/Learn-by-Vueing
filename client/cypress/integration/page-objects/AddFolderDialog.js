class AddFolderDialog {
  constructor() {}

  createFolder() {
    cy.get('[data-test="nav-add-folder-btn"]').click()
  }
  isVisible() {
    return cy.get('data-test="nav-add-folder-dialog"').should('be.visible')
  }
  newFolderNameInput() {

  }
  newFolderPublicCheckbox() {

  }
  newFolderIconSearch() {
    
  }
}

export default AddFolderDialog
