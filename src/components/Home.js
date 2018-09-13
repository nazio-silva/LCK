import React from "react";
import { View, Button } from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";  

import Pesquisa from "./Pesquisa";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proprietario: '',
      token: ''
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

    // RECEBENDO PARAMETRO POR NAVEGACAO DO USUARIO LOGADO
    const usuario = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
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

          <Pesquisa 
            nav={this.props.navigation}
            token={usuario.token} 
            clienteId={usuario.clienteId} 
            //proprietario={proprietario} 
          />
          
      </View>
    );
  }
}
