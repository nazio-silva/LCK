import axios from "axios";

import React from "react";
import { View, ScrollView, Text, Picker  } from "react-native";

import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";

export default class ListaVeiculos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      veiculo: "",
      listaVeiculos: [],
      checked: false,
      nav: null,
    };
  }

  static navigationOptions = {
    title: 'LISTA DE VEICULOS'
  };

  // OBJETO VEICULO SELECIONADO 
  selecionar_Veiculo = (veiculo) => { // OBJETO VEICULO
    console.log("Placa: " + veiculo.uVei) // ACESSANDO ATRIBUTOS DO OBJ VEICULO
    console.log("Descricao: " + veiculo.dsc_tp_Vei) 
    
    this.setState({ 
      veiculo: veiculo,
    })
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
      //console.log("OBJETO LV PLACA: " + veiculo.uVei)
      //console.log("OBJETO LV DESC: " + veiculo.dsc_tp_Vei)

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
          
        <ScrollView>
          {
            this.state.listaVeiculos.map(veiculo => {
              return (
                <View key={veiculo.id_vei} style={{ flex: 1 }}>
                  <ListItem
                      style={{
                        backgroundColor: "#fff",
                        marginLeft: 10,
                        flexDirection: "row",
                      }}
                      leftIcon={
                        <View
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
                            {veiculo.uVei + " - " + veiculo.dsc_tp_Vei}
                          </Text>
                        </View>
                      }
                      rightIcon={
                        <Picker 
                          key={veiculo.id_vei}
                          //selectedValue={this.state.opcao}
                          style={{ height: 50, width: 150 }}
                          onValueChange={
                            (opcao) => {
                              console.log("Veiculo: " + veiculo.uVei + " " + " Opção: " + opcao)
                              return this.setState({
                                opcao: opcao
                              })
                            }
                          }
                        >
                          <Picker.Item label="Ações" />
                          <Picker.Item label="ATIVAR ANCORA" value="Ancora" /> 
                          <Picker.Item label="BLOQUEAR" value="Bloqueio" />
                          <Picker.Item label="ROTAS" value="Rota" />
                          <Picker.Item label="COMO CHEGAR" value="Como chegar" />
                        </Picker>
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
 * CRIAR PICKER PARA MANIPULAR ACOES DO VEICULO CORRESPONDENTE - ok
 * REALIZAR FUNCOES SOBRE O VEICULO - BOQUEAR - ANCORA - ROTA - ok 
 * OBS : CORRIGIR OPCAO SELECIONADA - 18-09-18
 */

 