import axios from "axios";

import React from "react";
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  Picker,
  Alert
} from "react-native";

import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";

export default class ListaVeiculos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      veiculo: "",
      listaVeiculos: [],
      opcao: "",
      nav: null,

      id_Cliente: '',
      token_Cliente: '',
      placa: '',
      uMod: '',
      id_veiculo: '',
      uTipoComando: '',

      loading: false,
    };
    this.seleciona_opcao = this.seleciona_opcao.bind(this);
  }

  static navigationOptions = {
    title: "LISTA DE VEICULOS",
  }

  componentWillMount() {
    // ID e TOKEN DO USUARIO LOGADO
    const id_Cliente = this.props.navigation.state.params[0]; 
    const token_Cliente = this.props.navigation.state.params[1];

    const URL_BUSCA_VEICULO =
      "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_VEICULOS&token=" +
      token_Cliente +
      "&cliente=" +
      id_Cliente;

    axios
      .get(URL_BUSCA_VEICULO)
      .then(res => {
        const veiculos = res.data.dados;
        this.setState({ loading: true, listaVeiculos: veiculos });
      })
      .catch(err => console.log("Erro ao buscar dados da API: " + err));
  }

  seleciona_opcao() {
    // TOKEN DO USUARIO LOGADO
    const token_Cliente = this.props.navigation.state.params[1]; 
    
    const URL_BLOQUEARVEI_SMS = "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BLOQUEARVEI_SMS&uMod="+this.state.uMod+"&id_veiculo="+this.state.id_veiculo+"&token="+token_Cliente
    
    if(!this.state.opcao) {
        console.log("Nenhuma opcao selecionada...")
      } else if(this.state.opcao == "BLOQUEIO") {
        console.log("VEICULO: " + this.state.placa + " BLOQUEIO ")
        console.log("Status da API: " + this.state.uTipoComando),
        console.log("BLOQUEAR: " + URL_BLOQUEARVEI_SMS)
        axios.post(URL_BLOQUEARVEI_SMS)
            .then(() => {
              Alert.alert("Veiculo: " + this.state.placa + '\n' + "STATUS: " + this.state.uTipoComando)
            })
      } else {
        const URL_DESBLOQUEARVEI_SMS = "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=DESBLOQUEARVEI_SMS&uMod="+this.state.uMod+"&id_veiculo="+this.state.id_veiculo+"&token="+token_Cliente
        console.log("VEICULO: " + this.state.placa + " DESBLOQUEADO ")
        console.log("Status da API: " + this.state.uTipoComando),
        console.log("DESBLOQUEAR: " + URL_DESBLOQUEARVEI_SMS)
        axios.post(URL_DESBLOQUEARVEI_SMS)
            .then(() => {
              Alert.alert("Veiculo: " + this.state.placa + '\n' + "STATUS: " + this.state.uTipoComando)
            })
        Alert.alert("VEICULO: " + this.state.placa + '\n' + "STATUS: " + this.state.uTipoComando)
      } 
      return this.state.opcao
  }

  render() {
    
    this.seleciona_opcao();

    return (
      <View style={styles.viewListaVeiculos}>
        <ScrollView>
          {
            this.state.listaVeiculos.map((veiculo, indice) => {
              return (
                <View 
                  key={indice} 
                  style={{ flex: 1 }}
                >
                  <ListItem 
                    style={styles.listItem}
                    leftIcon={
                        <View style={styles.leftIcon}> 
                            <Icon 
                              name="car" 
                              size={20} 
                              style={{ color: "black" }} 
                            />
                            <Text style={styles.placaVeiculo}>
                              {veiculo.uVei}
                            </Text>
                        </View>
                    }
                    rightIcon={
                      <View
                        style={styles.rightIcon}
                        borderColor='#EEE9E9'
                        borderStyle='solid'
                        borderWidth={2}
                        borderRadius={10}
                      >
                        <Picker
                          selectedValue={veiculo.id_vei} 
                          onValueChange={(opcao) => {
                            this.setState({
                              placa: veiculo.uVei,
                              uMod: veiculo.uMod,
                              id_veiculo: veiculo.id_vei,
                              opcao: opcao,
                              uTipoComando: opcao
                            })
                          }}
                        >
                          <Picker.Item
                            label="AÇÕES"     
                            value={null} 
                          />
                          <Picker.Item 
                            label="BLOQUEAR" 
                            value="BLOQUEIO" 
                          />
                          <Picker.Item 
                            label="DESBLOQUEAR" 
                            value="DESBLOQUEIO" 
                          />
                        </Picker>
                      </View>
                    }
                  />
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )}
  }

// ESTILIZAÇÃO DO COMPONENTE
const styles = StyleSheet.create({
  viewListaVeiculos: {
    flex: 1, 
    backgroundColor: "#fff"
  },
  listItem: {
    backgroundColor: "#fff",
    marginLeft: 10,
    flexDirection: "row",
  },
  leftIcon: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  //Picker - Definição do selecionador TAMANHO e ALTURA
  rightIcon: {
    height: 50, 
    width: 150
  },

  placaVeiculo: {
    marginLeft: 10, 
    color: "black"
  },
})

/**
 * EXIBIR UMA LISTA DE VEICULOS 
 * SELECIONAR UM VEICULO DO USUARIO PESQUISADO
 * CRIAR PICKER PARA MANIPULAR ACOES DO VEICULO CORRESPONDENTE - ok
 * REALIZAR FUNCOES SOBRE O VEICULO - BOQUEAR - ANCORA - ROTA - ok 
 * OBS : CORRIGIR OPCAO SELECIONADA - 18-09-18
 * 
 * 24-09-18
 * OBS: AGUARDANDO ACOES DO PICKER
 */

/**
  * <Picker.Item label="Ações" value={null} />
  * <Picker.Item label="ATIVAR ANCORA" value="Ancora" /> 
  * <Picker.Item label="BLOQUEAR" value="Bloqueio" />
  * <Picker.Item label="ROTAS" value="Rota" />
  * <Picker.Item label="COMO CHEGAR" value="Como chegar" />
*/
