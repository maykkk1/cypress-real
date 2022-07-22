/// <reference types="cypress"/>

describe('Testando o backend', () => {
    let token


    it('Should create account', () => {
        cy.request({
            method: 'POST', 
            url: 'https://barrigarest.wcaquino.me/signin', 
            body: {email: "maycon", senha: "12345", redirecionar: false}
        }).its('body.token').should('not.to.be.empty')
            .then(tkn => token = tkn)
    })

    it('Should create an account', () => {
        
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            body: {nome: "testando234"},
            headers: { Authorization: `JWT ${token}`}
        })
    })
})