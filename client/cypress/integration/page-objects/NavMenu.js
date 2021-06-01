class NavMenu {
  constructor() {}

  createFolder() {
    cy.get('[data-test="nav-add-folder-btn"]').click()
  }
  navToFolders() {
    cy.get('[data-test="nav-folders-btn"]').click()
  }
  navToTags() {
    cy.get('[data-test="nav-tags-btn"]').click()
  }
  navToPublicFolders() {
    cy.get('[data-test="nav-public-folders-btn"]').click()
  }
}

export default NavMenu
