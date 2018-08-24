import { createStore } from 'redux'
import { Reducers } from '../reducers/index'

export const store = createStore( Reducers ); 

/**
 * DEVE-SE IMPORTAR TODOS OS REDUCERS COMBINADOS E PASSAR PARA A FUNCAO CREATESTORE
 * STORE - AQUI ESTA TODO O ESTADO DA APLICAÇÃO : STORE
 */