import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";

import { Header } from "react-native-elements";
import { ListItem } from "react-native-elements";

import Modal from "react-native-modal";

import Icon from "react-native-vector-icons/dist/FontAwesome";
import axios from 'axios'

export default class ListaVeiculos extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      user: "",
    };
  }

  // METODO PARA VISUALIZAR NO MODAL O USUARIO SELECIONADO
  detalhesUser = user => {
    this.setState({ user: user });
    Alert.alert("Usuario selecionado: " + user);
  };

  _toggleModal = () => {
    return this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  componentDidMount() {
    // ADICIONAR TOKEN DO USUARIO LOGADO 
    const URL_BUSCA_VEICULO = 
        'http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_VEICULOS&token=ae5c1faa3f153fe74994e1fe1efdd250'

    axios.get(URL_BUSCA_VEICULO)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    const lista = [
      {
        name: "Maria",
        veiculo: "car",
        placa: "HDK-4525",
        contato: "1111-1111",
      },
      {
        name: "Antonia",
        veiculo: "bicycle",
        placa: "HBO-6585",
        contato: "2222-2222",
      },
      {
        name: "Francisco",
        veiculo: "car",
        placa: "KSH-7845",
        contato: "3333-3333",
      },
      {
        name: "Joao",
        veiculo: "motorcycle",
        placa: "GBD-0565",
        contato: "4444-4444",
      },
      {
        name: "Francisco",
        veiculo: "car",
        placa: "KSH-7845",
        contato: "3333-3333",
      },
    ];

    // RECEBENDO TOKEN COMO PROPRIEDADE 
    const token = this.props.navigation.state.params;
    console.log("TOKEN LISTA VEICULOS: " + token)

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Header
            leftComponent={
              <Text style={{ fontSize: 20, color: "#fff" }}> Clientes </Text>
            }
            rightComponent={
              <Text style={{ fontSize: 20, color: "#fff" }}> Veiculos </Text>
            }
          />
        </View>

        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          {lista.map((usuario, indice) => (
            <TouchableOpacity onPress={this._toggleModal} key={indice}>
              <ListItem
                style={{ backgroundColor: "#fff", marginLeft: 10 }}
                leftIcon={
                  <View size={20} style={{ flexDirection: "row" }}>
                    <Icon name="user-o" size={20} style={{ color: "black" }} />
                    <Text style={{ marginLeft: 10, color: "black" }}>
                      {usuario.name}
                    </Text>
                  </View>
                }
                rightIcon={
                  <View size={20} style={{ flexDirection: "row" }}>
                    <Icon
                      name={usuario.veiculo}
                      size={20}
                      style={{ color: "black" }}
                    />
                    <Text style={{ marginLeft: 10, color: "black" }}>
                      {usuario.placa}
                    </Text>
                  </View>
                }
              />    
              
              <Modal isVisible={this.state.isModalVisible}>
                <View
                  style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10 }}
                >
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
                    <Text style={{ color: "black", fontSize: 30 }}>
                      PROPRIETARIO: {usuario.name}
                    </Text>
                    <Text style={{ color: "black", fontSize: 30 }}>
                      VEICULO: {usuario.veiculo}
                    </Text>
                    <Text style={{ color: "black", fontSize: 30 }}>
                      PLACA: {usuario.placa}
                    </Text>
                    <Text style={{ color: "black", fontSize: 30 }}>
                      CONTATO: {usuario.contato}
                    </Text>
                  </View>
                  {
                    /*
                    <Picker
                      selectedValue={this.state.user}
                      onValueChange={this.detalhesUser}
                    >
                      <Picker.Item label={usuario.name} value={valor a ser exibido} />
                    </Picker>
                    */
                  }
                </View>
              </Modal>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

// Retirar Picker 21-08-17

/*
    - LISTA DE VEICULOS
        - O USUARIO PODERA FAZER A PESQUISA PELO NOME DO PROP. OU PLACA DO VEICULO
        - EXIBE A LISTA COM NOME DO USUARIO - TIPO VEICULO ( M / C ) - PLACA 
*/
