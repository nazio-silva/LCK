const INITIAL_STATE = {
  email: "",
  senha: "",
  novaSenha: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGAR:
      return console.log("AÇÃO DE LOGAR");
      default:
      return state
  }
};

/**
 * EXPORTAR TODOS OS REDUCERS PARA O ARQUIVO PRINCIPAL DE REDUCERS
 * NO INDEX.JS NA PASTA(REDUCERS), SERA FEITO A COMBINAÇÃO DE TODOS OS REDUCERS
 */
