class NavView {
  constructor() {}

  getTitle(item) {
    return cy.get(`[data-test="nav-view-${item}-title"]`)
  }
  getList(item) {
    return cy.get(`[data-test="nav-view-${item}-list"]`)
  }
}

export default NavView
