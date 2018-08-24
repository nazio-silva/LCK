import React from "react";
import { Picker } from "react-native";
import axios from 'axios'

export default class SelectVeiculos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      veiculos: "",
    };
  }

  componentDidMount() {
    const token = this.props.token;
   
    console.log("TOKEN SelectVeiculos: " + token)
    const URL_BUSCA_VEICULO = 
    'http://wsapp.locktec.com.br/apiLCK_dev/services/services.php?action=BUSCA_VEICULOS&token='

      axios.get(URL_BUSCA_VEICULO + token)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
  }

  render() {

    return (
      <Picker
        style={{ height: 50, width: 100 }}
        selectedValue={this.state.veiculos}
        onValueChange={veiculo => this.setState({ veiculo: veiculo })}
      >
        <Picker.Item label="Moto" value="CB-300" />
        <Picker.Item label="Moto" value="CB-500" />
        <Picker.Item label="Moto" value="CB-600" />
      </Picker>
    );
  }
}
