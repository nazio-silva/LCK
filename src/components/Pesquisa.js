import React from "react";
import { View, Text } from 'react-native';

import { SearchBar } from "react-native-elements";
import ListaVeiculos from './ListaVeiculos'
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

        <View style={{ flex: 1 }}>
          {
            this.state.listaVeiculos.map((veiculo,index) => {
              
              // PEGANDO NOME DO PROPRIETARIO
              const proprietario = veiculo.uVei.split(" ").pop();
              console.log(proprietario)

              if(this.state.texto === veiculo.uVei) {  
                return <ListaVeiculos item={veiculo.uVei} veiculo={veiculo} proprietario={proprietario} />
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
