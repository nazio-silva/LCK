import { combineReducers } from 'redux'

// MEUS REDUCERS
import LOGIN from './Login'
import CADASTRAR_USUARIO from './Cadastrar_usuario'
import PESQUISAR_CLIENTE from './Pesquisar'
 
/**
 * AQUI VAMOS FAZER A COMBINAÇÃO DE TODOS OS REDUCERS DENTRO DA FUNCAO 'combineReducers'
 * COMBINAÇÃO DE REDUCERS - TODOS OS REDUCERS CRIADOS VAO AQUI E DEVEM SER PASSADOS PARA STORE
 */

export const Reducers = combineReducers({
    LOGIN: LOGIN,
    CADASTRAR_USUARIO: CADASTRAR_USUARIO,
    PESQUISAR_CLIENTE: PESQUISAR_CLIENTE
});