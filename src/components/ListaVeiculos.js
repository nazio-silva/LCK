import React from "react";

import { View, ScrollView, Text, TouchableOpacity, Alert, Picker } from "react-native";
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
      user: "",
      lista: [],
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

  render() {

    // RECEBENDO A LISTA DE VEICULOS DO COMPONENTE PESQUISA
    const item = this.props.item;
    const veiculo = this.props.veiculo;
    const proprietario = this.props.proprietario;

    console.log("ITEM LV: " + item)  
    console.log("VEICULOS LV: " + veiculo)  
    console.log("PROPRIETARIO LV: " + proprietario)  

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Header
            leftComponent={
              <Text style={{ fontSize: 20, color: "#fff" }}> Cliente </Text>
            }
            rightComponent={
              <Text style={{ fontSize: 20, color: "#fff" }}> Veículo </Text>
            }
          />
        </View>S

          <View style={{ backgroundColor: "#fff" }}>
            <TouchableOpacity onPress={this._toggleModal} >
              <ListItem
                style={{ backgroundColor: "#fff", marginLeft: 10 }}
                leftIcon={
                  <View size={20} style={{ flexDirection: "row", backgroundColor: "#fff" }}>
                    <Icon name="user-o" size={20} style={{ color: "black" }} />
                    <Text style={{ marginLeft: 10, color: "black" }}>
                      { proprietario }
                    </Text>
                  </View>
                }
                rightIcon={
                  <View size={20} style={{ flexDirection: "row", backgroundColor: "#fff" }}>
                    <Icon
                      name="car"  // OBSERVAÇÃO DO TIPO DE VEICULO
                      size={20}
                      style={{ color: "black" }}
                    />
                    <Text style={{ marginLeft: 10, color: "black" }}>
                      { item.split(" ", 1) }
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
                      PROPRIETARIO:
                    </Text>
                    <Text style={{ color: "black", fontSize: 30 }}>
                      VEICULO:
                    </Text>
                    <Text style={{ color: "black", fontSize: 30 }}>
                      PLACA:
                    </Text>
                    <Text style={{ color: "black", fontSize: 30 }}>
                      CONTATO:
                    </Text>
                  </View>

                  <Picker
                    selectedValue={this.state.user}
                    onValueChange={this.detalhesUser}
                  >
                    <Picker.Item
                      label="AÇÕES"
                      value="teste" // OBS
                    />
                  </Picker>
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}
