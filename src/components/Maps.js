import React from "react";
import { View, Alert } from "react-native";
import { Header } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/dist/FontAwesome";


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
      },
    };
  }

  static navigationOptions = {
    header: null,
    drawerIcon: () => <Icon name="map" size={20} color={"black"} />
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
    
    // RECEBENDO PARAMETROS DO COMPONENTE LISTA DE VEICULO
    // const proprietario = this.props.navigation.state.params;
    // console.log("MAPS: " + proprietario);

    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={
            <Icon
              name="bars"
              size={30}
              color="white"
              onPress={() => this.props.navigation.openDrawer()}
            />
          }
          centerComponent={{
            text: "MAPS",
            style: {
              color: "#fff",
              fontSize: 30,
              width: "100%",
              textAlign: "center",
            },
          }}
        />
        <View style={{ flex: 1 }}>
          {this.state.region.latitude ? ( 
            <MapView
              style={{ flex: 1 }}
              region={this.state.region}
                //onRegionChange={() => 
                  //this.state.region
                  //console.log("Antes: " + region.latitude)
                  //this.setState({ region : region })
                  //console.log("Depois LT: " + region.latitude)
                  //console.log("Depois LG: " + region.longitude)
                //}
              showsUserLocation={true}
              followsUserLocation={true}
              maximumZ={10}
            >

            <Marker
              coordinate={
                this.state.region
                //latitude: this.state.region.latitude,
                //longitude: this.state.region.longitude,
              }
              title="Teste" //{usuario.login}
              description="Posição Teste"
            />

           </MapView> ) : (
              Alert.alert("Erro")
          )}
        </View>
      </View>
    );
  }
}

