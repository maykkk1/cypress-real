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
            url: '/contas',
            body: {nome: "testando234"},
            headers: { Authorization: `JWT ${token}`}
        }).as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'testando234')
        })
    })

    it('Should update account', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `/contas/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: "conta alterada via rest"
                }
            })
        })
    })

    it('Should not create an account with same name', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            body: {nome: "Conta mesmo nome"},
            headers: { Authorization: `JWT ${token}`},
            failOnStatusCode: false
        }).as('response')


        cy.get('@response').then(res =>{
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })
})
