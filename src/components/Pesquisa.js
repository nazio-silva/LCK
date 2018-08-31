import React from "react";
import { View, Alert, Text } from 'react-native';

import { SearchBar } from "react-native-elements";
import ListaVeiculos from './ListaVeiculos'
import SideMenu from "react-native-side-menu";

import axios from 'axios'

export default class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: "",
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
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <SideMenu style={{ flex: 1, backgroundColor: "#fff" }}>
          <SearchBar
            value={this.state.texto}
            showLoading
            lightTheme
            placeholder="Pesquisar pelo veiculo"
            onChangeText={this.pesquisar}
          />  

          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {
              this.state.listaVeiculos.map((veiculo,index) => {
                
                // PEGANDO NOME DO PROPRIETARIO RETIRADO DA ULTIMA POSICAO DO ARRAY
                const proprietario = veiculo.uVei.split(" ").pop();
                console.log("Proprietario: " + proprietario)
                
                // PEGANDO PLACA DO VEICULO 
                const placa = veiculo.uVei.split(" ", 1)
                console.log("Placa: " + placa)

                if(veiculo.uVei.indexOf(this.state.texto) != -1 || this.state.texto == '') {   
                  return <ListaVeiculos item={veiculo.uVei} veiculo={veiculo} proprietario={proprietario} />              
                } else {
                  console.log("Veiculo nao encontrado!")
                }
              })
            }
          </View>
        </SideMenu>
      </View>
    );
  }
}


/**
 *  if(this.state.texto === veiculo.uVei || this.state.texto.toUpperCase() === veiculo.uVei) {  
                return <ListaVeiculos item={veiculo.uVei} veiculo={veiculo} proprietario={proprietario} />
              } else {
                console.log("Veiculo nao encontrado!")
              }

    if(veiculo.uVei.indexOf(this.state.texto) != -1 || this.state.texto == '') {   
      return <View><Text>{veiculo.uVei}</Text></View>//<ListaVeiculos item={veiculo.uVei} veiculo={veiculo} proprietario={proprietario} />
    } else {
      console.log("Veiculo nao encontrado!")
    }
 */