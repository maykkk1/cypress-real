/// <reference types="cypress"/>

describe('Testando o backend', () => {
    let token

    before(()=>{
        cy.getToken('maycon', '12345').then(tkn => {
            token = tkn
        })
    })

    beforeEach(()=>{
        cy.resetarConta(token)
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            body: {nome: "testando234"},
            headers: { Authorization: `JWT ${token}`}
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'testando234')
        })
    })



})