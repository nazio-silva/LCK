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
    const listaClientes = this.props.listaClientes;

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          leftComponent={
            <Text style={{ fontSize: 20, color: "#fff" }}> Cliente </Text>
          }
          rightComponent={
            <Text style={{ fontSize: 20, color: "#fff" }}> Veículos </Text>
          }
        />
        <ScrollView>
          {
            /* FAZER MAP PRA LISTAR OS PROPRIETARIOS
              listaClientes.map((cliente) => {
                console.log(cliente.nome.split())
              })
            */
          }
          <ListItem
            style={{
              backgroundColor: "#fff",
              marginLeft: 10,
              flexDirection: "row",
            }}
            leftIcon={
              <TouchableOpacity
                onPress={this._toggleModal}
                style={{ flexDirection: "row", backgroundColor: "#fff" }}
              >
                <Icon name="user-o" size={20} style={{ color: "black" }} />
                <Text style={{ marginLeft: 10, color: "black" }}>
                  {proprietario}
                </Text>
              </TouchableOpacity>
            }
            rightIcon={
              <View style={{ flex: 1 }}>
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
            }
          />
        </ScrollView>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10 }}>
            <Header
              leftComponent={
                <Icon
                  name="arrow-left"
                  size={30}
                  color="white"
                  onPress={this._toggleModal}
                />
              }
              centerComponent={{
                text: "DETALHES",
                style: {
                  color: "#fff",
                  fontSize: 30,
                  textAlign: "center",
                },
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {this.state.listaVeiculos.map(veiculo => {
                return (
                  <View
                    key={veiculo.id_vei}
                    style={{
                      flex: 1,
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "black", fontSize: 20 }}>
                      PROPRIETARIO:
                    </Text>
                    <Text
                      style={{ color: "black", fontSize: 20, marginLeft: 20 }}
                    >
                      {proprietario}
                    </Text>
                    <Text style={{ color: "black", fontSize: 20 }}>
                      VEICULO: {veiculo.dsc_tp_Vei}
                    </Text>
                    <Text style={{ color: "black", fontSize: 20 }}>
                      PLACA: {veiculo.uVei}
                    </Text>
                    <Text style={{ color: "black", fontSize: 20 }}>
                      LOCALIZAÇÃO:
                    </Text>
                    <Text
                      style={{ color: "black", fontSize: 20, marginLeft: 10 }}
                    >
                      {veiculo.uPonto.split(",", 4)}
                    </Text>
                    <Text style={{ color: "black", fontSize: 20 }}>
                      STATUS: {"Veiculo esta à " + veiculo.uVel + "Km"}
                    </Text>
                  </View>
                );
              })}
            </View>

            <Picker
              selectedValue={this.state.opcao}
              onValueChange={this.detalhesUser}
            >
              <Picker.Item label="Selecione uma opção:" />
              
              <Picker.Item label="BLOQUEAR" value="Bloqueio" />
              <Picker.Item label="ANCORA" value="Ancora" />
              <Picker.Item label="STATUS" value="Status" />
              <Picker.Item label="ROTA" value="Rota" />
            </Picker>
          </View>
        </Modal>
      </View>
    );
  }
}
