/// <reference types="cypress"/>

describe('Login', () => {
    beforeEach(()=> {
        
        cy.visit('https://barrigareact.wcaquino.me/')
    })

    it('Inserindo conta existente', () => {
        cy.logar('maycon', '12345', true)
    })

    it('Inserindo conta inexistente', () => {
        cy.logar('xxxxxx', 'xxxxx', false)
    })

})