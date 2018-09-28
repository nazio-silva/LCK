import React from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";  

import Pesquisa from "./Pesquisa";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  render() {

    // RECEBENDO PARAMETRO POR NAVEGACAO DO USUARIO LOGADO
    const usuario = this.props.navigation.state.params;

    return (
      <View style={styles.viewHome}>
          <Header
            centerComponent={{
              text: "LOCKTEC",
              style: {
                color: "#fff",
                fontSize: 30,
                textAlign: "center",
              }
            }}
          />

          <Pesquisa 
            nav={this.props.navigation}
            token={usuario.token}
            clienteId={usuario.clienteId} 
          />
          
      </View>
    );
  }
}

// ESTILIZAÇÃO DO COMPONENTE
const styles = StyleSheet.create({
  viewHome: {
    flex: 1, 
    backgroundColor: "#fff"
  }
})