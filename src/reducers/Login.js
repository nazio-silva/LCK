import { LOGIN } from '../actions/actionsType'

const INITIAL_STATE = {
  email: "teste@gmail.com",
  senha: "123456",
  manterConectado: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return console.log("LOGANDO NA APLICAÇÃO...");
    default:
      return state;
  }
};

/**
 * EXPORTAR TODOS OS REDUCERS PARA O ARQUIVO PRINCIPAL DE REDUCERS
 */
