import { PESQUISAR } from "../actions/actionsType";

const INITIAL_STATE = {
  placa: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PESQUISAR:
      return console.log("Pesquisando...");
    default:
      return state;
  }
};
