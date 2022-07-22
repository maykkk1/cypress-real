/// <reference types="cypress"/>

describe('Testando o backend', () => {


    it('Should create account', () => {
        cy.request({
            method: 'POST', 
            url: 'https://barrigarest.wcaquino.me/signin', 
            body: {email: "maycon", senha: "12345", redirecionar: false}
        }).its('body.token').should('not.to.be.empty')
        console.log('test')
    })
})