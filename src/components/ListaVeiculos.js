import axios from "axios";

import React from "react";
import { View, ScrollView, Text, TouchableOpacity  } from "react-native";

import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";

export default class ListaVeiculos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      veiculo: "",
      listaVeiculos: [],
      nav: null
    };
  }

  static navigationOptions = {
    //header: null,
    title: 'LISTA DE VEICULOS'
  };

  // OBJETO VEICULO SELECIONADO 
  selecionar_Veiculo = (veiculo) => { // OBJETO VEICULO
    console.log("Placa: " + veiculo.uVei) // ACESSANDO ATRIBUTOS DO OBJ VEICULO
    console.log("Descricao: " + veiculo.dsc_tp_Vei) 
    
    this.setState({ 
      veiculo: veiculo,
    })

    //console.log("Veiculo Selecionado: " + this.state.veiculo) 
    //this.props.nav.navigate("ListaVeiculos", this.state.veiculo)
    //console.log("Veiculo Selecionado: " + this.state.veiculo) 
  };

  _toggleModal = () => {
    return this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  componentWillMount() {
    // ok
    const id_Cliente = this.props.navigation.state.params[0]; 
    const token_Cliente = this.props.navigation.state.params[1];
      console.log("Cliente ID LV: " + id_Cliente)
      console.log("Cliente TK LV: " + token_Cliente)
      
    const URL_BUSCA_VEICULO =
    "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_VEICULOS&token=" +
    token_Cliente + "&cliente=" + id_Cliente;

    axios
      .get(URL_BUSCA_VEICULO)
      .then(res => {
        const veiculos = res.data.dados;
        this.setState({ listaVeiculos: veiculos });
      })
      .catch(err => console.log("Erro ao buscar dados da API: " + err));
  }

  render() {

    // RECEBENDO OBJ VEICULO DO COMPONENTE LISTAVEICULOS
    const veiculo = this.props.navigation.state.params
      console.log("OBJETO LV PLACA: " + veiculo.uVei)
      console.log("OBJETO LV DESC: " + veiculo.dsc_tp_Vei)

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
          
        <ScrollView>
          {
            this.state.listaVeiculos.map(veiculo => {
              return (
                <View key={veiculo.id_vei}>
                <ListItem
                    style={{
                      backgroundColor: "#fff",
                      marginLeft: 10,
                      flexDirection: "row",
                    }}
                    leftIcon={
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#fff",
                        }}
                      >
                        <Icon
                          name="car"
                          size={20}
                          style={{ color: "black" }}
                        />
                        <Text style={{ marginLeft: 10, color: "black" }}>
                          {veiculo.uVei + " " + veiculo.dsc_tp_Vei}
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                </View>
              );  
            })
          }
        </ScrollView>
      </View>
    );
  }
}

/**
 * EXIBIR UMA LISTA DE VEICULOS 
 * SELECIONAR UM VEICULO DO USUARIO PESQUISADO
 * EXIBIR O VEICULO NO MAPA
 * REALIZAR FUNCOES SOBRE O VEICULO - BOQUEAR - ANCORA - ROTA 
 * CRIAR PICKER PARA MANIPULAR ACOES DO VEICULO CORRESPONDENTE
 * 
 * <Picker.Item
                  key={veiculo.id_vei}
                  label={veiculo.dsc_tp_Vei + " " + veiculo.uVei}
                  value={veiculo}
                />
 */