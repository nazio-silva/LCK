// FUNCAO QUE POSSUI OBJETO PARA CADA ACAO
import React from "react";

import { createDrawerNavigator } from "react-navigation";

/*
  INICIO DO REDUX
*/

import { Provider } from "react-redux";
import Exit from "./src/components/Exit";

// IMPORTAÇÃO DE TODOS OS COMPONENTES DE NAVEGAÇÃO
import FormLogin from "./src/components/FormLogin";
import Home from "./src/components/Home";
import Maps from "./src/components/Maps";
import Profile from "./src/components/Profile";
import Settings from "./src/components/Settings";
import Tracking from "./src/components/Tracking";

import { Reducers } from './src/reducers';

const store = Reducers;

// FUNCAO CREATESTACKNAVIGATIOR ARM. NA CONST APP  => APENAS PARA NAVEGAÇÃO ENTRE TELAS ATRAVES DE BOTAO ETC
// FUNCAO CREATEDRAWERNAVIGATOR => NAVEGAÇÃO DE ACORDO COM A OPÇÃO DO MENU LATERAL

// COMPONENTE DE ROTAS BASEADO EM FUNCAO
const AppRoutes = createDrawerNavigator({
  FormLogin: { screen: FormLogin },
  Home: { screen: Home },
  Profile: { screen: Profile },
  Settings: { screen: Settings },
  Tracking: { screen: Tracking },
  Maps: { screen: Maps },
  Exit: { screen: Exit }, // NAO PRECISA DESTE COMPONENTE
});

module.exports = AppRoutes;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    );
  }
}

// PROBLEMA REACT-NAVIGATION 16.4.1 DOWNGRADE PARA 16.3.0

// COLOCAR NAVEGAÇÃO NA PAG DE FORMLOGIN
