/**
 * ACTIONS DA APLICAÇAO : FUNCOES QUE DISPARAM UMA AÇÃO PARA OS REDUCERS ALTERAR O ESTADO DA APLICAÇÃO
 * SAO DISPARADAS POR ACTIONS CREATORS QUE ATIVAM OS REDUCERS
 * MINHA FUNCAO ACTION CREATOR QUE RETORNA UMA AÇÃO
 * DEFINICAO DE ACTIONS CREATORS
 */
export const LOGAR = (email, senha, manterConectado) => ({
    type: 'LOGAR',
    payload: {
        email: email, 
        senha: senha, 
        manterConectado: manterConectado
    }
});

export const CADASTRAR_USUARIO = (nome, email, telefone) => ({
    type: 'CADASTRAR_USUARIO',
    payload: {
        nome: nome, 
        email: email, 
        telefone: telefone
    }
});

// BASEADO NO ES6
export const PESQUISAR = (placa) => ({
    type: 'PESQUISAR',
    payload: {
        placa
    }
});

// VERIFICAR AS ACTIONS CREATORS 20-08-18