import React from "react";
import { View, Text } from 'react-native';

import { SearchBar } from "react-native-elements";
//import ListaVeiculos from './ListaVeiculos'
import SideMenu from "react-native-side-menu";

//import { Header } from "react-native-elements";
//import { ListItem } from "react-native-elements";

import axios from 'axios'

export default class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: " ",
      listaVeiculos: []
    };
    this.pesquisar = this.pesquisar.bind(this);
  }

  componentDidMount() {

    // ADICIONAR TOKEN DO USUARIO LOGADO NA URL
    const token = this.props.token;
    const cli_id = this.props.clienteId;

    console.log("Token PES: " + token);
    console.log("CLIENTE_ID PES: " + cli_id);

    const URL_BUSCA_VEICULO =
      "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_VEICULOS&token=" + token + "&cliente=" + cli_id;

      console.log("URL + TOKEN: " + URL_BUSCA_VEICULO);

    axios
      .get(URL_BUSCA_VEICULO)
      .then(res => {
        const veiculos = res.data.dados;
        this.setState({ listaVeiculos: veiculos });
      })
      .catch(err => console.log("Erro ao buscar dados da API: " + err));
  }

  pesquisar(texto) {
    this.setState({ texto });   
  }

  render() {
    return (
      <SideMenu style={{ flex: 1 }}>
        <SearchBar
          value={this.state.texto}
          showLoading
          lightTheme
          placeholder="Pesquisar pelo veiculo"
          onChangeText={this.pesquisar}
        />  

        {
          //<ListaVeiculos listaVeiculos={this.state.listaVeiculos} texto={this.state.texto} />
        }

        <View style={{ flex: 1 }}>
          {
            this.state.listaVeiculos.map((veiculo,index) => {
              if(this.state.texto === veiculo.uVei) {  
                return <Text key={index} style={{ color: "red" }}>{veiculo.uVei}</Text>
              } else {
                console.log("Veiculo nao encontrado!")
              }
            })
          }
        </View>
      </SideMenu>
    );
  }
}

// RENOMEAR ESTE COMPONENTE

/**
 <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                marginRight: 10,
                height: 40,
                width: 250,
                borderColor: "blue",
                borderWidth: 2,
                borderRadius: 10,
                textAlign: "center",
              }}
              placeholder="Digite a placa do veiculo"
              required
              onChangeText={this.pesquisar}
            />
            
            <Icon name="search" size={30} style={{ color: "#4682B4" }} />

          </View>
  
 */
