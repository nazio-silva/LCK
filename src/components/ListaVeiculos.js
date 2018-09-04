import React from "react";

import { View, Text, TouchableOpacity, Alert, Picker, ScrollView } from "react-native";
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
      lista: [],
    };
  }

  // METODO PARA VISUALIZAR NO MODAL O USUARIO SELECIONADO
  detalhesUser = opcao => {
    this.setState({ opcao: opcao });
    Alert.alert("Opção selecionada: " + opcao);
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
    console.log("VEICULOS LV: " + veiculo.uVei) //uPonto  
    console.log("VEICULOS LV LOCAL: " + veiculo.uPonto.split(",",4))
    console.log("PROPRIETARIO LV: " + proprietario)  

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {
              //<View style={{ flex: 1, backgroundColor: "#fff" }}>
            }
            
            <Header
                leftComponent={
                  <Text style={{ fontSize: 20, color: "#fff" }}> Cliente </Text>
                }
                rightComponent={
                  <Text style={{ fontSize: 20, color: "#fff" }}> Veículo </Text>
                }
            />
              
            {
              //</View>
            }

            <ScrollView>
              <TouchableOpacity onPress={this._toggleModal}>
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
                          name="car"  // OBSERVAÇÃO DO TIPO DE VEICULO - CARRO - MOTO - BICICLETA
                          size={20}
                          style={{ color: "black" }}
                        />
                        <Text style={{ marginLeft: 10, color: "black" }}>
                          { item.split(" ", 1) }
                        </Text>
                      </View>
                    }
                />

                {
                  // CRIAR UM COMPONENTE DE MODAL E IMPORTAR PARA A LISTA DE VEICULOS 
                }

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
                      <Text style={{ color: "black", fontSize: 20 }}>
                        PROPRIETARIO: {proprietario}
                      </Text>
                      <Text style={{ color: "black", fontSize: 20 }}>
                        CONTATO:
                      </Text>
                      <Text style={{ color: "black", fontSize: 20 }}>
                        VEICULO:
                      </Text>
                      <Text style={{ color: "black", fontSize: 20 }}>
                        PLACA: { item.split(" ", 1) }
                      </Text>
                      <Text style={{ color: "black", fontSize: 20 }}>
                        LOCALIZAÇÃO:  
                      </Text>
                      <Text style={{ color: "black", fontSize: 20, marginLeft: 20 }}>
                        { veiculo.uPonto.split(",",4) }
                      </Text>
                    </View>
                    
                    <Picker 
                      selectedValue={this.state.opcao} 
                      onValueChange={this.detalhesUser}
                    >
                      <Picker.Item 
                        label= 'Selecione uma opção:'
                        value= 'null'
                      />
                      <Picker.Item label="BLOQUEAR" value="Bloqueio" />
                      <Picker.Item label="ANCORA" value="Ancora" />
                      <Picker.Item label="STATUS" value="Status" />
                      <Picker.Item label="ROTA" value="Rota" />
                    </Picker>
                    
                  </View>
                </Modal>
              </TouchableOpacity>
            </ScrollView>
      </View>
    );
  }
}
