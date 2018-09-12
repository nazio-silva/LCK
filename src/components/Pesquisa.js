import axios from "axios";
import React from "react";

import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SearchBar } from "react-native-elements";
import { ListItem } from "react-native-elements";

import SideMenu from "react-native-side-menu";

import Icon from "react-native-vector-icons/dist/FontAwesome";
import { createStackNavigator } from 'react-navigation';
import Maps from './Maps'

const URL_BUSCA_CLIENTE =
  "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_CLIENTES&token=";

export default class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: "",
      token: "",
      cli_id: "",
      page: 1,
      requesting: false,
      isModalVisible: false,
      listaClientes: [],
    };
    this.pesquisar = this.pesquisar.bind(this);
  }

  componentWillMount() {
    const token = this.props.token;
    const cli_id = this.props.clienteId;

    this.setState({
      token,
      cli_id,
    });

    const BUSCA_CLIENTE = URL_BUSCA_CLIENTE + token + "&cliente=" + cli_id + "&page="+this.state.page+"&query=" + this.state.texto;

    axios
      .get(BUSCA_CLIENTE)
      .then(res => {
        const clientes = res.data.dados;
        this.setState({ listaClientes: clientes });
      })
      .catch(err => console.log("Erro ao buscar dados da API: " + err));
  }

  pesquisar(texto) {
    this.setState({ texto });
    if(this.state.requesting == true){
      return true;
    }

    this.state.requesting = true;

    axios
      .get(
          URL_BUSCA_CLIENTE +
          this.state.token +
          "&cliente=" +
          this.state.cli_id +
          "&page="+this.state.page+"&query=" +
          this.state.texto
      )
      .then(() => {
        const BUSCA_CLIENTE = URL_BUSCA_CLIENTE + this.state.token + "&cliente=" + this.state.cli_id + "&page="+this.state.page + "&query=" + this.state.texto
            this.state.requesting = false;
              axios.get(BUSCA_CLIENTE) 
                .then(res => {
                  const clientes = res.data.dados;
                  this.setState({ listaClientes: clientes });
                },
              )
              console.log("Encontrado")
      })
      .catch(() => {
        this.state.requesting = false;
        console.log("Erro ao pesquisar dados na API!");
      });

    console.log(
      "Teste URL: " +
        URL_BUSCA_CLIENTE +
        this.state.token +
        "&cliente=" +
        this.state.cli_id +
        "&page="+this.state.page+"&query=" +
        this.state.texto
    );
  } 

  _toggleModal = () => {
    return this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  _exibeMapa = () => {
    createStackNavigator({
      Maps: { screen: Maps }
    })
    .then(this.props.navigation.navigate("Maps"));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <SideMenu style={{ flex: 1, backgroundColor: "#fff" }}>
          <SearchBar
            value={this.state.texto}
            showLoading
            lightTheme
            placeholder="Pesquisar pelo cliente"
            onChangeText={this.pesquisar}
          />
          {
            this.state.listaClientes.map(cliente => {
            const proprietario = cliente.nome.split();
            const dados = cliente.nome.toLowerCase();

            if (
              cliente.nome.indexOf(this.state.texto) != -1 ||
              this.state.texto == "" || 
              dados.indexOf(this.state.texto) != -1
            ) {
              return (
                <ListItem
                  key={cliente.id}
                  style={{
                    backgroundColor: "#fff",
                    marginLeft: 10,
                    flexDirection: "row",
                  }}
                  leftIcon={
                      <TouchableOpacity
                        onPress={this._exibeMapa}
                        style={{ flexDirection: "row", backgroundColor: "#fff" }}
                      >
                        <Icon
                          name="user-o"
                          size={20}
                          style={{ color: "black" }}
                        />
                        <Text style={{ marginLeft: 10, color: "black" }}>
                          { proprietario }
                        </Text>
                      </TouchableOpacity>
                  }
                />
              );
            } else {
              console.log("Cliente nao encontrado!");
            }
          })}
        </SideMenu>
      </View>
    );
  }
}

