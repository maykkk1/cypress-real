/// <reference types="cypress"/>
import loc from "../support/locators"


describe('Inserindo conta', () => {
    before(()=> {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.logar('maycon', '12345', true)
        cy.resetarContas()  
    })

    it('Should create account', () => { 
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTA.NOME).type('Conta de teste')
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGEM).should('contain', 'Conta inserida com sucesso!')
             
    })

    it('Should update an account', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTA.SELECIONAR_CONTA_PELO_NOME('Conta para alterar') + ' ~ >:nth-child(1)').click()
        cy.get(loc.CONTA.NOME).click().clear().type('Conta alterada')
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGEM).should('contain', 'Conta atualizada com sucesso')
        cy.get(loc.CONTA.SELECIONAR_CONTA_PELO_NOME('Conta alterada')).should('have.text', 'Conta alterada')
    })

    it('Should not create an account with same name', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTA.NOME).type('Conta alterada')
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGEM).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Movimentacao de teste')
        cy.get(loc.MOVIMENTACAO.VALOR).type('1500')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Interessado teste')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN).click()
        cy.get(loc.MESSAGEM).should('contain', 'Movimentação inserida com sucesso!')
        cy.get(loc.EXTRATO.FC_SELECIONAR_EXTRATO_PELO_NOME('Movimentacao de teste')).should('exist')
        cy.get(loc.EXTRATO.FC_SELECIONAR_VALOR_DA_MOVIMENTACAO('Movimentacao de teste')).should($el => expect($el.text().replace(/\u00a0/g, " ")).to.equal('R$ 1.500,00'))
    })

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.get(loc.HOME.FC_SELECIONAR_SALDO('Conta mesmo nome')).should($el => expect($el.text().replace(/\u00a0/g, " ")).to.equal('R$ 1.500,00'))
    })
})