import axios from "axios";

import React from "react";
import { View, Picker } from "react-native";

//import { Header } from "react-native-elements";
//import { ListItem } from "react-native-elements";
//import Modal from "react-native-modal";
//import Icon from "react-native-vector-icons/dist/FontAwesome";

export default class ListaVeiculos extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      veiculo: "",  // veiculo selecionado
      listaVeiculos: [],
      nav: null
    };
  }

  // VEICULO SELECIONADO 
  selecionar_Veiculo = (veiculo) => {
    this.setState({ 
      veiculo: veiculo,
    })
    //console.log("Veiculo Selecionado: " + this.state.veiculo) 
    this.props.nav.navigate("Maps", this.state.veiculo )
    console.log("Veiculo Selecionado: " + this.state.veiculo) 
  };

  _toggleModal = () => {
    return this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  componentWillMount() {

    const id_Cliente = this.props.id_Cliente;
    const token = this.props.token;

    console.log("ID LV: " + id_Cliente )
    console.log("TOKEN LV: " + token )
      
        const URL_BUSCA_VEICULO =
        "http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_VEICULOS&token=" +
        token + "&cliente=" + id_Cliente;
        //console.log(URL_BUSCA_VEICULO);
    
        axios.get(URL_BUSCA_VEICULO)
          .then(res => {
            const veiculos = res.data.dados;
            this.setState({ listaVeiculos: veiculos });
          })
          .catch(err => console.log("Erro ao buscar dados da API: " + err));
  }

  render() {
    //this.state.listaVeiculos.map(v => console.log(v))
    return (
     
      <View>
          <Picker
            selectedValue={this.state.veiculo}  
            onValueChange={this.selecionar_Veiculo}
          >
              <Picker.Item
                label="Selecione um veiculo:"
                value={this.state.veiculo}
              />
              {
                this.state.listaVeiculos.map(veiculo => {
                  return (
                    <Picker.Item
                      key={veiculo.id_vei}
                      label={veiculo.dsc_tp_Vei + " " + veiculo.uVei}
                      value={veiculo.uVei} //veiculo.uVei
                    />
                  );  
                })
              }
            </Picker>
          </View>
    );
  }
}
