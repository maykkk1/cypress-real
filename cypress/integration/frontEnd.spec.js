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
                conta: "Carteira",
                saldo: "1500.00"
                },
                {
                conta_id: 22222,
                conta: "Banco",
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

    it('Should create an account', ()=>{
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
                {id: 2, nome: 'Banco', visivel:true, usuario_id: 1}
            ]
        })

        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1
            }
        })

        cy.acessarMenuContas()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
                {id: 2, nome: 'Banco', visivel:true, usuario_id: 1},
                {id: 3, nome: 'Conta de teste', visivel:true, usuario_id: 1}
            ]
        })


        cy.get(loc.CONTA.NOME).type('Conta de teste')
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGEM).should('contain', 'Conta inserida com sucesso!')
    })

    it.only('Should update an account', () => {

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
                {id: 2, nome: 'Banco', visivel:true, usuario_id: 1},
                {id: 3, nome: 'Conta de teste', visivel:true, usuario_id: 1}
            ]
        })

        cy.route({
            method: 'PUT',
            url: '/contas/1',
            response: {
                id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1
            }
        })

        cy.acessarMenuContas()


        cy.get(loc.CONTA.SELECIONAR_CONTA_PELO_NOME('Carteira') + ' ~ >:nth-child(1)').click()
        cy.get(loc.CONTA.NOME).click().clear().type('Conta alterada')
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGEM).should('contain', 'Conta atualizada com sucesso')
    })
})