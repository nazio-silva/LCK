import { PESQUISAR_CLIENTE } from "../actions/actionsType";

const INITIAL_STATE = {
  cliente: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PESQUISAR_CLIENTE:
      return console.log("PESQUISANDO POR UM CLIENTE...");
    default:
      return state;
  }
};
