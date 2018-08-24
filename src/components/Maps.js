import React from "react";
import { View, Alert } from "react-native";
import { Header } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import SelectVeiculos from "./SelectVeiculos";

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0922;

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      },
    };
  }

  static navigationOptions = {
    header: null,
    drawerIcon: () => <Icon name="map" size={20} color={"black"} />,
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("Posição atualizada : " + position);
      this.setState({
        region: {
          latitude : position.coords.latitude,
          longitude : position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      })
    }, (error) => Alert.alert("Erro: " + error.message),
    {enableHightAcuracy: true, timeout: 20000}
  )
  this.watchID = navigator.geolocation.watchPosition(position => {
    const newRegion = {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    this.setState({ region: newRegion })
  })
  }

  render() {
    const usuario = this.props.navigation.state.params;
    console.log("MAPS: " + usuario.token);

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
          {
            this.state.region.latitude ?
            <MapView
            style={{ flex: 1 }}
            region={this.state.region}
            showsUserLocation={true}
            followsUserLocation={true}
            //onRegionChange={this.onRegionChange}
            >
            
            <Marker
              coordinate={{
                latitude: this.state.lat,
                longitude: this.state.long,
              }}
              title={usuario.login}
              description="Posição Teste"
            />
            

            <SelectVeiculos token={usuario.token} />
          </MapView> : Alert.alert("Erro")
          }
        </View>
      </View>
    );
  }
}

/** 
 * VERIFICAR POSICAO ATUAL DISPOSITIVO 23-08-18
 */
