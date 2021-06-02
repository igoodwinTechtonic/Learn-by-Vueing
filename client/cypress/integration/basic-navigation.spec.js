import HomePage from './page-objects/HomePage.js'
import NavMenu from './page-objects/NavMenu.js'
import NavView from './page-objects/NavView.js'

describe('Basic navigation actions', () => {

  const login = new HomePage()
  it('Should nav to home page', () => {
    login.visit()
  })
  it('Should click the log in button', () => {
    login.login()
  })
  // it('Click the log in with google button', () => {
  //   login.loginWithGoogle()
  // })

  const leftNav = new NavMenu()
  const rightNav = new NavView()
  it('Should render folders view', () => {
    leftNav.navToFolders()
    rightNav.getTitle('folders').should('contain.text', 'Folders')
    rightNav.getList('folders').should('have.length.at.least', 1)
  })
  it('Should render tags view', () => {
    leftNav.navToTags()
    rightNav.getTitle('tags').should('contain.text', 'Tags')
    rightNav.getList('tags').should('have.length.at.least', 1)
  })
  it('Should render public folders view', () => {
    leftNav.navToPublicFolders()
    rightNav.getTitle('folders').should('contain.text', 'Public Folders')
    rightNav.getList('folders').should('have.length.at.least', 1)
  })

})
