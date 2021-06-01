import HomePage from './page-objects/HomePage.js'
import NavMenu from './page-objects/NavMenu.js'
import NavView from './page-objects/NavView.js'

describe('Bookmark actions', () => {

  // Setup
  const login = new HomePage()
  
  it('Should nav to home page', () => {
    login.visit()
  })
  it('Should click the log in button', () => {
    login.login()
  })

  const leftNav = new NavMenu()
  const rightNav = new NavView()

  it('Should create a folder', () => {
    leftNav.createFolder()
  })

  it('Should render folders view', () => {
    leftNav.navToFolders()
    rightNav.getTitle('folders').should('contain.text', 'Folders')
    // rightNav.getList('folders').should('have.length.at.least', 1)
  })


  it('Should create a new bookmark', () => {

  })
})