import React from "react";
import { View, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import ListaVeiculos from './ListaVeiculos';


const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = 1;

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,  //null
        longitudeDelta: 0, //null
        veiculo_selecionado: ''
      },
    }; 
  }

  static navigationOptions = {
    //header: null,
    title: 'MAPA'
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      },
      error => Alert.alert("Erro: " + error.message),
      { enableHightAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      this.setState({ region: newRegion });
    });
  }

  render() {

    // RECEBENDO PROPRIEDADES DO COMPONENTE LISTAVEICULOS
    const id_Cliente = this.props.navigation.state.params[0]; 
    const token_Cliente = this.props.navigation.state.params[1];
      console.log("Cliente ID Maps: " + id_Cliente)
      console.log("Cliente TK Maps: " + token_Cliente)

    // RECEBENDO OBJ VEICULO DO COMPONENTE LISTAVEICULOS
    const veiculo = this.props.navigation.state.params
      console.log("OBJETO VC Maps: " + veiculo)
      console.log("OBJETO VC Maps PLACA: " + veiculo.uVei)
      console.log("OBJETO VC Maps DESC: " + veiculo.dsc_tp_Vei)

      

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
        
          <ListaVeiculos id_Cliente={id_Cliente} token={token_Cliente} nav={this.props.navigation} />

          {this.state.region.latitude ? ( 
            <MapView
              style={{ flex: 1 }}
              region={this.state.region}
                //onRegionChange={(region) => 
                  //this.state.region
                  //console.log("Antes: " + region.latitude)
                  //.setState({ region : region })
                  //console.log("Depois LT: " + region.latitude)
                  //console.log("Depois LG: " + region.longitude)
                //}
              showsUserLocation={true}
              followsUserLocation={true}
              maximumZ={10}
            >
            
            <Marker
              coordinate={{ 
                // this.state.region
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude
              }}
              title={veiculo.uVei}
              description={veiculo.dsc_tp_Vei}
            />

           </MapView> ) : (
              //Alert.alert("Erro")
              console.log("Erro ao localizar o veiculo.")
          )}
        </View>
      </View>
    );
  }
}


//"uLat": "-12.933482",
//"uLng": "-38.4972",
