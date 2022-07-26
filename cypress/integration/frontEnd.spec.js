/// <reference types="cypress"/>
import loc from "../support/locators"


describe('Should test at an inteface level', () => {
    after(()=>{
        cy.clearLocalStorage()
    })
    before(()=>{
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 1000, "nome": "Usuario falso", "token": "certamente eh um token"
            }
        }).as('signin')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 11111,
                conta: "Conta com movimentacao",
                saldo: "1500.00"
                },
                {
                conta_id: 22222,
                conta: "Conta com mt dinheiro",
                saldo: "150000000.00"
                },
                {
                conta_id: 33333,
                conta: "Conta sem dinheiro",
                saldo: "00.00"
                }
                ]
        }).as('saldo')

        cy.logar('Usuario falso', 'senha', true)
    })

    it('', ()=>{

    })
})