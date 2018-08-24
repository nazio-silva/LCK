import React from "react";
import { View, Text } from "react-native";

import { SearchBar } from "react-native-elements";

import SideMenu from "react-native-side-menu";

export default class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: " ",
    };
    this.pesquisar = this.pesquisar.bind(this);
  }

  pesquisar(texto) {
    this.setState({ texto });
    // Continuar Logica de pesquisa por item
  }

  render() {

    return (
      <SideMenu style={{ flex: 1, backgroundColor: "white" }}>
        <SearchBar
          showLoading
          lightTheme
          placeholder="Pesquisar"
          onChangeText={this.pesquisar}
        />

        <View style={{ backgroundColor: "#fff" }}>
          <Text style={{ color: "red" }}>{this.state.texto}</Text>
        </View>

      </SideMenu>
    );
  }
}

// RENOMEAR ESTE COMPONENTE
