import axios from "axios";

import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Alert, AsyncStorage } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

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

      visibleSpinner: false,

    };
    this.LOGIN = this.LOGIN.bind(this);
    this.manterConectado = this.manterConectado.bind(this);

    //this.recuperarData(); 
  }

  // ARMAZENANDO DADOS NO LOCAL STORAGE
  saveData = async () => {
    try {
      await AsyncStorage.setItem('token', this.state.token);
      //console.log("SAVE DATA: " + this.state.token);
      //console.log("SAVE DATA: " + this.state.login);
      //console.log("SAVE DATA: " + this.state.senha);

      this.props.navigation.navigate("Token", { token: this.state.token });

    } catch (error) {
      console.log("Erro ao salvar os dados: " + error);
    }
  };

  // RECUPERANDO DADOS NO LOCAL STORAGE - GETITEM
  recuperarData = async () => {
    try {
      const token = await AsyncStorage.getItem('token',this.state.token);
      if (token !== null) {
        console.log("RECUPERAR DATA: " + token);
        //return this.LOGIN()
        //return this.props.navigation.navigate("Home", { token: this.state.token }); INICIANDO APLICAÇAO NA PAGINA HOME
      }
    } catch (error) {
      console.log("Erro ao recuperar dados: " + error);
    }
  };

  // FUNCAO DE LOGIN - AUTENTICA NA API COM OS DADOS DO USUARIO
  LOGIN() {
    const URLPOST = URL + this.state.login + "&senha=" + this.state.senha;
    if (this.state.login === "" || this.state.senha === "") {
      Alert.alert("E-mail ou senha Invalido!");
    } else {  // || this.state.token adicionado
      //VERIFICAR this.state.checked

      axios.post(URLPOST).then(res => {
        if (res.data.success === true) {
          //console.log("Dados enviados com sucesso!");
          const dados = res.data;
          //console.log(dados);
          //console.log("CLIENTE-ID: " + dados.cli_id);

          // SETANDO TOKEN NA VARIAVEL DE ESTADO DO COMPONENTE DE ACORDO COM USUARIO
          this.setState({
            token: dados.token,
            clienteID: dados.cli_id,
            login: this.state.login 
          });

          console.log("ESTADO COM TOKEN: " + this.state.token);

          // PASSANDO PARAMETRO LOGIN PARA PAGINA HOME
          this.saveData()
            .then(() => 
              this.props.navigation.navigate("Home", { 
                token: this.state.token, 
                clienteId: this.state.clienteID,
                login: this.state.login, 
                //visibleSpinner: !this.state.visibleSpinner
              }
            ))
            .then(
              setInterval(() => {}, 2000))
        }
      });
    }
  }

  // FUNCAO QUE AUTENTICA USANDO TOKEN EXISTENTE 17-08-19
  manterConectado() {
    if (this.state.checked === false) {
      console.log("Entrar sem autenticar novamente");
      this.recuperarData()
      //this.props.navigation.navigate("Home")
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
          <View style={{ flexDirection: "row", marginBottom: 20, marginRight: 10 }}>
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
              onChangeText={login => this.setState({ login })}
            />
          </View>

          <View style={{ flexDirection: "row", marginRight: 10 }}>
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
              onChangeText={senha => this.setState({ senha })}
            />
          </View>
          
          <View style={{ marginLeft: 30, margin: 10 }}>
            <CheckBox
              title="Manter-se Conectado"
              checked={this.state.checked}
              onPress={this.manterConectado}
            /> 
          </View>  

          <Spinner visible={this.state.visibleSpinner} textContent={"Carregando..."} textStyle={{color: 'red'}} />       

          <View style={{ height: 40, width: 200, marginLeft: 20 }}>
            <Button
              title="ENTRAR" 
              onPress={this.LOGIN} />
          </View>

          <View style={{ marginLeft: 30}}>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text style={{ color: "red", fontSize: 20 }}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>
          </View>
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
    alignItems: "center"
  },
  form: {
    flex: 1, 
    justifyContent: "space-around",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },
});

