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
        cy.getAccountByName( 'Conta para alterar', token)
            .then(accountId => {
            cy.request({
                method: 'PUT',
                url: `/contas/${accountId}`,
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
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create transaction', () => {
        cy.getAccountByName('Conta para movimentacoes', token)
            .then(accountId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    body: {
                        conta_id: accountId,
                        data_pagamento: "25/07/2022",
                        data_transacao: "25/07/2022",
                        descricao: "teste",
                        envolvido: "fulano",
                        status: true,
                        tipo: "REC",
                        valor: "1000"
                    },
                    headers: { Authorization: `JWT ${token}`}
                })
            }).then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('id')
                expect(res.body.descricao).to.be.equal('teste')
                expect(res.body.envolvido).to.be.equal('fulano')
            })
    })

    it('Should get balance', () => {
        
    })
})
