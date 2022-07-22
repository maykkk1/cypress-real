const locators = {
    LOGIN : {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN: '.btn'
    }, 
    HOME: {
        FC_SELECIONAR_CONTA_PELO_NOME: nome => `td:contains(${nome})`,
        FC_SELECIONAR_SALDO: nome => `td:contains(${nome}) ~`
    }
    ,
    MESSAGEM: '.toast-message',
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test="menu-movimentacao"]'
    },
    CONTA: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        SELECIONAR_CONTA_PELO_NOME: nome => `td:contains(${nome})`
    }, 
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        BTN: '.btn-primary',
        STATUS : '[data-test=status]'
    },
    EXTRATO: {
        FC_SELECIONAR_EXTRATO_PELO_NOME: nome => `.list-group li:contains(${nome})`,
        FC_SELECIONAR_VALOR_DA_MOVIMENTACAO: nome => `.list-group li:contains(${nome}) small:eq(0)`
    }
}

export default locators;