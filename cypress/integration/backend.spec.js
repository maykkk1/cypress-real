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
        cy.request({
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null
            res.body.forEach(conta => {
                if(conta.conta === 'Conta para saldo') {
                    saldoConta = conta.saldo
                }
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: "GET",
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                descricao: "Movimentacao 1, calculo saldo"
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `/transacoes/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}`},
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    conta_id: res.body[0].conta_id,
                    valor: res.body[0].valor
                }
            })
        })

        cy.request({
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null
            res.body.forEach(conta => {
                if(conta.conta === 'Conta para saldo') {
                    saldoConta = conta.saldo
                }
            })
            expect(saldoConta).to.be.equal('4034.00')
        })


    })

    it('Should remove transaction', () => {
        cy.request({
            method: "GET",
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                descricao: "Movimentacao 1, calculo saldo"
            }
        }).then(res => {
            cy.request({
                method: 'DELETE',
                url: `/transacoes/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}`}
            }).its('status').should('be.equal', 204)
        })

    })
})
