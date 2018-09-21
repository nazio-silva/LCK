import axios from "axios";

import React from "react";
import { View, ScrollView, Text, Picker } from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";

export default class ListaVeiculos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      veiculo: "",
      listaVeiculos: [],
      checked: false,
      opcao: "",
      bloqueio: "",
      nav: null,
    };
  }

  static navigationOptions = {
    title: "LISTA DE VEICULOS",
  };

  // OBJETO VEICULO SELECIONADO
  selecionar_Veiculo = veiculo => {
    // OBJETO VEICULO
    console.log("Placa: " + veiculo.uVei); // ACESSANDO ATRIBUTOS DO OBJ VEICULO
    console.log("Descricao: " + veiculo.dsc_tp_Vei);

    this.setState({
      veiculo: veiculo,
    });
  };

  componentDidMount() {
    const id_Cliente = this.props.navigation.state.params[0];
    const token_Cliente = this.props.navigation.state.params[1];
    console.log("Cliente ID LV: " + id_Cliente);
    console.log("Cliente TK LV: " + token_Cliente);

    const URL_BUSCA_VEICULO =
      "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_VEICULOS&token=" +
      token_Cliente +
      "&cliente=" +
      id_Cliente;

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
    const veiculo = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView>
          {this.state.listaVeiculos.map(veiculo => {
            return (
              <View key={veiculo.id_vei} style={{ flex: 1 }}>
                <ListItem
                  //key={veiculo.id_vei}
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
                      <Icon name="car" size={20} style={{ color: "black" }} />
                      <Text style={{ marginLeft: 10, color: "black" }}>
                        {veiculo.uVei}
                      </Text>
                    </View>
                  }
                  rightIcon={
                    <View
                      style={{ height: 50, width: 150 }}
                      borderColor='#EEE9E9'
                      borderStyle='solid'
                      borderWidth={2}
                      //borderRightColor='#EEE9E9'
                      borderRadius={10}
                    >
                      <Picker
                        //key={veiculo.id_vei}
                        selectedValue={veiculo.uTipoComando}
                        onValueChange={(opcao, index) => {
                          console.log(
                            "Veiculo: " + veiculo.uVei + " " + " Opção: " + opcao
                          );
                          this.setState({
                            opcao: opcao,
                            bloqueio: veiculo.uTipoComando, // STATUS DA API - DESBLOQUEIO ou BLOQUEIO
                          }),
                            console.log("Status da API: " + veiculo.uTipoComando);
                        }}  
                      >
                        <Picker.Item label="AÇÕES" value={null} color='red' />
                        <Picker.Item label="BLOQUEAR" value="Veiculo Bloqueado" />
                      </Picker>
                    </View>
                  }
                />
              </View>
            );
          })}
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

/**
  * <Picker.Item label="Ações" value={null} />
  * <Picker.Item label="ATIVAR ANCORA" value="Ancora" /> 
  * <Picker.Item label="BLOQUEAR" value="Bloqueio" />
  * <Picker.Item label="ROTAS" value="Rota" />
  * <Picker.Item label="COMO CHEGAR" value="Como chegar" />
*/
