import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";  

import Pesquisa from "./Pesquisa";
import ListaVeiculos from "./ListaVeiculos";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static navigationOptions = {
    header: null,
    drawerIcon: () => (
      <View>
        <Icon name="home" size={20} color={"black"} />
      </View>
    ),
  };
  render() {

    // RECEBENDO PARAMETRO POR NAVEGACAO
    const usuario = this.props.navigation.state.params;
    console.log("TOKEN HOME: " + usuario.token)
    console.log("CLI_ID HOME: " + usuario.clienteId)

    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={
            <Icon
              name="bars"
              size={30}
              color="white"
              onPress={() => this.props.navigation.openDrawer()}
            />
          }
          centerComponent={{
            text: "LOCKTEC",
            style: {
              color: "#fff",
              fontSize: 30,
              width: "100%",
              textAlign: "center",
            },
          }}
        />
        
        <View style={{ flex: 1, paddingTop: '20%'}}>
          <Pesquisa token={usuario.token} clienteId={usuario.clienteId} />
          {
          //<ListaVeiculos token={usuario.token} clienteId={usuario.clienteId} />
          }
        </View>
        
      </View>
    );
  }
}
