import { combineReducers } from 'redux'

// MEUS REDUCERS
import LOGAR from './Logar'
import CADASTRAR_USUARIO from './Cadastrar_usuario'
import PESQUISAR from './Pesquisar'
 
/**
 * AQUI VAMOS FAZER A COMBINAÇÃO DE TODOS OS REDUCERS DENTRO DA FUNCAO 'combineReducers'
 * COMBINAÇÃO DE REDUCERS - TODOS OS REDUCERS CRIADOS VAO AQUI E DEVEM SER PASSADOS PARA STORE
 */

export const Reducers = combineReducers({
    LOGAR: LOGAR,
    CADASTRAR_USUARIO: CADASTRAR_USUARIO,
    PESQUISAR: PESQUISAR
});