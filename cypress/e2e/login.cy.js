describe('OrangeHRM Login - Test', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  const username = 'input[name="username"]'
  const password = 'input[name="password"]'
  const loginBtn = 'button[type="submit"]'
  const errorMsg = '.oxd-alert-content-text'
  const requiredMsg = '.oxd-input-field-error-message'
  const title = '.orangehrm-login-title'

  beforeEach(() => {
    cy.visit(url)
  })

  // TC01 - Valid login
  it('TC01 - Login valid', () => {
    cy.get(username).type('Admin')
    cy.get(password).type('admin123')
    cy.get(loginBtn).click()

    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-title')
      .should('be.visible')
      .and('contain', 'Dashboard')
  })

  // TC02 - Login dengan Username salah
  it('TC02 - Login dengan Username salah', () => {
    cy.get(username).type('Admin123')
    cy.get(password).type('admin123')
    cy.get(loginBtn).click()

    cy.get(errorMsg)
      .should('be.visible')
      .and('contain', 'Invalid')
  })

  // TC03 - Login dengan Password salah
  it('TC03 - Login dengan Password salah', () => {
    cy.get(username).type('Admin')
    cy.get(password).type('admin1234')
    cy.get(loginBtn).click()

    cy.get(errorMsg)
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq('Invalid credentials')
      })
  })

  //TC04 - Login dengan menggunakan Username kosong
  it('TC04 - Login dengan Username kosong', () => {
    cy.get(password).type('admin123')
    cy.get(loginBtn).click()

    cy.get(requiredMsg)
      .should('exist')
      .and('contain', 'Required')
  })

  // TC05 - Login dengan menggunakan Password Kosong
  it('TC05 - Login dengan Password kosong', () => {
    cy.get(username).type('Admin')
    cy.get(loginBtn).click()

    cy.get(password)
      .should('have.attr', 'type', 'password')

    cy.get(requiredMsg).should('contain', 'Required')
  })

  //TC06 - Semua kosong
  it('TC06 - Login dengan kondisi Semua kosong', () => {
    cy.get(loginBtn).click()

    cy.get(requiredMsg)
      .should('have.length.greaterThan', 0)
  })

  //TC07 - Input panjang (boundary test)
  it('TC07 - Login dengan Input sangat panjang', () => {
    const longText = 'a'.repeat(100)

    cy.get(username).type(longText)
    cy.get(password).type(longText)
    cy.get(loginBtn).click()

    cy.get(errorMsg).should('be.visible')
  })

  //TC08 - Hidden Password
  it('TC08 - Password dalam bentuk hidden', () => {
    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password')
  })

  //TC09 - Button Login Enabled
  it('TC09 - Button login enabled', () => {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('not.be.disabled')
  })

  // TC10 - Validasi UI login page
  it('TC10 - Validasi elemen UI login', () => {
    cy.get(title).should('have.text', 'Login')

    cy.get(username).should('be.visible')
    cy.get(password).should('be.visible')
    cy.get(loginBtn).should('be.enabled')
  })

  //TC11 - Klik login tanpa isi (validasi focus error)
  it('TC11 - Klik login tanpa input', () => {
    cy.get(loginBtn).click()

    cy.get(requiredMsg)
      .first()
      .should('be.visible')
  })

  //TC12 - Refresh page tetap di login
  it('TC12 - Refresh halaman', () => {
    cy.reload()

    cy.url().should('include', '/login')
  })
  
  //TC13 - Validasi Placeholder pada Input
  it('TC13 - Validasi placeholder input', () => {
    cy.get('input[name="username"]')
      .should('have.attr', 'placeholder', 'Username')

    cy.get('input[name="password"]')
      .should('have.attr', 'placeholder', 'Password')
  })

  //TC14 - Validasi Label Form
  it('TC14 - Validasi label form', () => {
    cy.contains('label', 'Username').should('be.visible')
    cy.contains('label', 'Password').should('be.visible')
  })

  //TC15 - Validasi Halaman (Login Fail)
  it('TC15 - Tetap di halaman login jika gagal', () => {
    cy.get('input[name="username"]').type('salah')
    cy.get('input[name="password"]').type('salah')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/login')
  })

  //TC16 - Validasi Informasi Akun Tampil
  it('TC16 - Informasi Akun Tampil',() =>{
    cy.contains('Forgot your password?').should('be.visible')
  })

    //TC17 - Validasi Informasi Akun Tampil
  it('TC17 - Informasi Akun Tampil',() =>{
    cy.contains('Forgot your password?').should('be.visible')
  })


})