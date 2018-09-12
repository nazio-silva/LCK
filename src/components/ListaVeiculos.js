import axios from "axios";

import React from "react";
import { View, ScrollView , Text, TouchableOpacity, Picker } from "react-native";

import { Header } from "react-native-elements";

import { ListItem } from "react-native-elements";
import Modal from "react-native-modal";

import Icon from "react-native-vector-icons/dist/FontAwesome";

export default class ListaVeiculos extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      opcao: "",
      listaVeiculos: [],
    };
  }

  detalhesUser = opcao => {
    this.setState({ opcao: opcao });
    console.log("Veiculo selecionado: " + opcao);
  };

  _toggleModal = () => {
    return this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  componentWillMount() {
    const id_cliente_pesquisado = this.props.id_cliente_pesquisado;
    const token = this.props.token;

    const URL_BUSCA_VEICULO =
      "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_VEICULOS&token=" +
        token + "&cliente=" + id_cliente_pesquisado;
        //console.log(URL_BUSCA_VEICULO);

    axios
      .get(URL_BUSCA_VEICULO)
      .then(res => {
        const veiculos = res.data.dados;
        this.setState({ listaVeiculos: veiculos });
      })
      .catch(err => console.log("Erro ao buscar dados da API: " + err));
  }

  render() {
    // RECEBENDO A LISTA DE VEICULOS DO COMPONENTE PESQUISA
    const proprietario = this.props.proprietario;
    console.log(proprietario)

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}> 
         {
           /**
            * <View style={{ flex: 1 }}>
                <Picker
                  selectedValue={this.state.opcao}
                  onValueChange={this.detalhesUser}
                >
                  <Picker.Item
                    label="Selecione um veiculo:"
                    value={this.state.opcao}
                  />
                  {this.state.listaVeiculos.map(veiculo => {
                    return (
                      <Picker.Item
                        key={veiculo.id_vei}
                        label={veiculo.uVei}
                        value={veiculo.uVei}
                      />
                    );  
                  })}
                </Picker>
              </View>
            */
          }
      </View>
    );
  }
}
