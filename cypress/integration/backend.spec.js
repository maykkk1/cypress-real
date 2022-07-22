/// <reference types="cypress"/>

describe('Testando o backend', () => {
    let token

    before(()=>{
        cy.getToken().then(tkn => {
            token = tkn
        })
    })

    beforeEach(()=>{
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/reset',
            headers: { Authorization: `JWT ${token}`}
        }).then(res => console.log(res))
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