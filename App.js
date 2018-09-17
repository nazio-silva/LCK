import React from "react";

import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import { Provider } from "react-redux";

// IMPORTAÇÃO DE TODOS OS COMPONENTES DE NAVEGAÇÃO
import FormLogin from "./src/components/FormLogin";
import Home from "./src/components/Home";
import ListaVeiculos from './src/components/ListaVeiculos';

import Maps from "./src/components/Maps";
import Profile from "./src/components/Profile";
import Settings from "./src/components/Settings";
import Tracking from "./src/components/Tracking";
import Exit from "./src/components/Exit";

import { Reducers } from './src/reducers';

const store = Reducers;

// FUNCAO CREATESTACKNAVIGATIOR ARM. NA CONST APP  => APENAS PARA NAVEGAÇÃO ENTRE TELAS ATRAVES DE BOTAO ETC
// FUNCAO CREATEDRAWERNAVIGATOR => NAVEGAÇÃO DE ACORDO COM A OPÇÃO DO MENU LATERAL

// COMPONENTE DE ROTAS BASEADO EM FUNCAO
const AppRoutes = createStackNavigator(
  { 
    FormLogin: FormLogin,
    Home: Home,
    ListaVeiculos: ListaVeiculos 
  },
  {
    initialRouteName: 'FormLogin'
  }
);

// COMPONENTES DE ROTAS MENU-DRAWER E TELAS
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

/*
PROBLEMA REACT-NAVIGATION 16.4.1 DOWNGRADE PARA 16.3.0

  -- TELAS -- 
  const AppRoutes = createStackNavigator({ 
    FormLogin: FormLogin,
    Home: Home,
    Maps: Maps 
  });

  -- MENU DRAWER OPTIONS -- 
  createDrawerNavigator({
    FormLogin: { screen: FormLogin },
    Home: { screen: Home },
    Profile: { screen: Profile },
    Settings: { screen: Settings },
    Tracking: { screen: Tracking },
    //Maps: { screen: Maps },
    Exit: { screen: Exit }, // NAO PRECISA DESTE COMPONENTE
  });
*/