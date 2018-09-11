import React from "react";
import { View, Alert, ScrollView } from 'react-native';

import { SearchBar } from "react-native-elements";
import ListaVeiculos from './ListaVeiculos'
import SideMenu from "react-native-side-menu";

import axios from 'axios'

const URL_BUSCA_CLIENTE = "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_CLIENTES&token=";

export default class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: "",
      token:"",
      cli_id: "",
      listaClientes: []
    };
    this.pesquisar = this.pesquisar.bind(this);
  }

  componentDidMount() {
    const token = this.props.token;
    const cli_id = this.props.clienteId;

    this.setState({ 
      token,
      cli_id 
    });

    const URL_BUSCA_CLIENTE =
      "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_CLIENTES&token=" 
      + token +"&cliente=" + cli_id + "&page=1&query=" + this.state.texto;
      //console.log(URL_BUSCA_CLIENTE)

    axios
      .get(URL_BUSCA_CLIENTE)
      .then(res => {
        const clientes = res.data.dados;
        this.setState({ listaClientes: clientes });
      })
      .catch(err => console.log("Erro ao buscar dados da API: " + err));
  }

  pesquisar(texto) {
    this.setState({ texto });
    axios.post(URL_BUSCA_CLIENTE + this.state.token +"&cliente=" + this.state.cli_id + "&page=1&query=" + this.state.texto)
      .then(() => console.log("Encontrado")) 
      .catch(() => console.log("Erro ao pesquisar dados na API!")) 
      console.log("Teste URL: " + URL_BUSCA_CLIENTE + this.state.token +"&cliente=" + this.state.cli_id + "&page=1&query=" + this.state.texto) 
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
            this.state.listaClientes.map((cliente) => {
              const proprietario = cliente.nome.split();
              const id_cliente_pesquisado = cliente.id;
              const dados = cliente.nome.toLowerCase();

              if(cliente.nome.indexOf(this.state.texto) != -1 || this.state.texto == '' || dados.indexOf(this.state.texto) != -1) { 
                return <ListaVeiculos 
                          key={cliente.id}
                          listaClientes={this.state.listaClientes}
                          proprietario={proprietario} 
                          id_cliente_pesquisado={id_cliente_pesquisado}
                          token={this.state.token} 
                          cli_id={this.state.cli_id} />           
              } else {
                console.log("Cliente nao encontrado!");
              }
            })  
          }
        </SideMenu>
      </View>
    );
  }
}
