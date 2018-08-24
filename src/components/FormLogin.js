import axios from "axios";

import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Alert, AsyncStorage } from "react-native";

import { Header, CheckBox } from "react-native-elements";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import Cadastro from "./Cadastro";
import Logo from "./Logo";

const URL =
  "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=LOGIN&login=";

export default class FormLogin extends React.Component {
  static navigationOptions = {
    header: null,
    drawerLabel: "LOCKTEC",
  };
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      senha: "",
      token: "",
      clienteID: "",
      checked: false,
      isModalVisible: false,
    };
    this.LOGIN = this.LOGIN.bind(this);
    this.manterConectado = this.manterConectado.bind(this);
  }

  // ARMAZENANDO DADOS NO LOCAL STORAGE
  saveData = async () => {
    try {
      await AsyncStorage.setItem(this.state.token, "true");
      console.log("MEU TOKEN: " + this.state.token);

      this.props.navigation.navigate("Token", { token: this.state.token });
    } catch (error) {
      console.log("Erro ao salvar os dados: " + error);
    }
  };

  // RECUPERANDO DADOS NO LOCAL STORAGE
  recuperarData = async () => {
    try {
      const valor = await AsyncStorage.getItem(this.state.token);
      if (valor !== null) {
        console.log("Valor: " + valor);
      }
    } catch (error) {
      console.log("Erro ao recuperar dados: " + error);
    }
  };

  // FUNCAO DE LOGIN - AUTENTICA NA API COM OS DADOS DO USUARIO
  LOGIN() {
    const URLPOST = URL + this.state.login + "&senha=" + this.state.senha;
    if (this.state.login === "" || this.state.senha === "") {
      console.log("E-mail ou senha Invalidos!");
      Alert.alert("E-mail ou senha Invalido!");
    } else if (this.state.checked) {
      //VERIFICAR this.state.checked
      axios.post(URLPOST).then(res => {
        if (res.data.success === true) {
          console.log("Dados enviados com sucesso!");

          const dados = res.data;
          console.log(dados);

          console.log("CLIENTE-ID: " + dados.cli_id);

          // SETANDO TOKEN NA VARIAVEL DE ESTADO DO COMPONENTE DE ACORDO COM USUARIO
          this.setState({
            token: dados.token,
          });

          console.log("ESTADO COM TOKEN: " + this.state.token);

          // PASSANDO PARAMETRO LOGIN PARA PAGINA HOME
          this.saveData().then(() =>
            this.props.navigation.navigate("Maps", { login: this.state.login, token: this.state.token })
          );
        }
      });
    }
  }

  // FUNCAO QUE AUTENTICA USANDO TOKEN EXISTENTE 17-08-19
  manterConectado() {
    if (this.state.checked === false) {
      //this.state.recuperarData
      console.log("Entrar sem autenticar novamente");
      this.recuperarData();
    } else {
      console.log("Digitar Login e Senha!");
    }
    this.setState({ checked: !this.state.checked });
  }

  // MODAL - FUNCAO PARA EXIBIR O MODAL
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
  
    return (
      <View style={styles.view}>
        <Logo />
        <View style={styles.form}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="user" size={30} style={{ color: "#4682B4" }} />
            <TextInput
              style={{
                marginLeft: 10,
                height: 40,
                width: 250,
                borderColor: "blue",
                borderWidth: 2,
                borderRadius: 10,
                textAlign: "center",
              }}
              placeholder="Digite seu e-mail"
              required
              onChangeText={login => this.setState({ login })}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon name="lock" size={40} style={{ color: "#4682B4" }} />
            <TextInput
              style={{
                marginLeft: 10,
                height: 40,
                width: 250,
                borderColor: "blue",
                borderWidth: 2,
                borderRadius: 10,
                textAlign: "center",
              }}
              secureTextEntry={true}
              placeholder="Digite sua senha"
              required
              onChangeText={senha => this.setState({ senha })}
            />
          </View>

          <CheckBox
            title="Manter-se Conectado"
            checked={this.state.checked}
            onPress={this.manterConectado}
          />

          <View>
            <Button title="ENTRAR" onPress={this.LOGIN} />
          </View>

          <TouchableOpacity onPress={this._toggleModal}>
            <Text style={{ color: "red", fontSize: 20 }}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

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
                text: "CADASTRO",
                style: {
                  color: "#fff",
                  fontSize: 30,
                  textAlign: "center",
                },
              }}
            />
            <Cadastro />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 1, //2
    //paddingTop: 50,
    justifyContent: "space-around",
    alignItems: "center",
    width: 400,
  },
});

/*
DEBUG REMOTO
CMD-M > Dev settings > Debug server host & port for device > digite "localhost: 8081"

ARMAZENAR NO LOCALSTORAGE 
  TOKEN DE ACESSO
  CLIENTEID
*/
