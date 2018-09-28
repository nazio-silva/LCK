import React from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";

export default class FormLogin extends React.Component {
  static navigationOptions = {
    //header: null,
    //drawerLabel: "LOCKTEC",
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      novaSenha: "",
    };
  }

  render() {

    return (
      <View style={styles.view}>
        <View style={styles.form}>
          <View style={{ flexDirection: "row" }}>
            <Icon 
              name="user" 
              size={30} 
              style={{ color: "#4682B4" }} 
            />
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
              required={true}
              onChangeText={
                email => this.setState({ email })
              }
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon 
              name="lock" 
              size={40} 
              style={{ color: "#4682B4" }} 
            />
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
              placeholder="Digite sua nova senha"
              required={true}
              onChangeText={
                password => this.setState({ password })
              }
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon 
              name="lock" 
              size={40} 
              style={{ color: "#4682B4" }} 
            />
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
              placeholder="Repetir sua nova senha"
              required={true}
              onChangeText={
                password => this.setState({ password })
              }
            />
          </View>

          <View>
            <Button 
              title="SALVAR" 
              onPress={
                () => Alert.alert("Cadastro realizado com sucesso!")
              } 
            />
          </View>
        </View>
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
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: 400,
  },
});
