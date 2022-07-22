// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from '../support/locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })

})

Cypress.Commands.add('logar', (usuario, senha, contaExiste) => {
    cy.get(loc.LOGIN.USER).type(usuario)
    cy.get(loc.LOGIN.PASSWORD).type(senha)
    cy.get(loc.LOGIN.BTN).click()
    cy.get(loc.MESSAGEM).then(msg => {
        contaExiste 
        ? cy.wrap(msg).should('have.text', `Bem vindo, ${usuario}!`)
        : cy.wrap(msg).should('have.text', 'Erro: Error: Request failed with status code 400')  
    })
})


Cypress.Commands.add('resetarContas', ()=>{
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()   
})

Cypress.Commands.add('getToken', (user, passwd) => {
    let token
    cy.request({
        method: 'POST', 
        url: 'https://barrigarest.wcaquino.me/signin', 
        body: {email: user, senha: passwd, redirecionar: false}
    }).its('body.token').should('not.to.be.empty')
        .then(tkn => tkn)
})

Cypress.Commands.add('resetarConta', token =>{
        cy.request({
            method: 'GET', 
            url: 'https://barrigarest.wcaquino.me/reset',
            headers: { Authorization :  `JWT ${token}`}
        }).its('status').should('be.equal', 200)
})