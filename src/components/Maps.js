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
        latitude: 0,
        longitude: 0,
        latitudeDelta: null,
        longitudeDelta: null,
      },
    };
  }

  static navigationOptions = {
    header: null,
    drawerIcon: () => <Icon name="map" size={20} color={"black"} />,
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("Posição atualizada : " + position);
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
    
    // RECEBENDO PARAMETROS DA PAGINA DE LOGIN
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
          {this.state.region.latitude ? (
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
            </MapView>
          ) : (
            Alert.alert("Erro")
          )}
        </View>
      </View>
    );
  }
}

/** 
 * VERIFICAR POSICAO ATUAL DISPOSITIVO 23-08-18
 * 
 * componentDidMount() { 
 * navigator.geolocation.getCurrentPosition((position) => { 
 *    this.setState({ 
 *        latitude: position.coords.latitude, 
 *        longitude: position.coords.longitude, 
 *        error: null, 
 *    }); 
 *      
 *    var myApiKey = ''; 
 *    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + myApiKey) 
 *      .then((response) => response.json()) 
 *      .then((responseJson) => { 
 *          console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson)); 
 *      var locationName = responseJson.results[0].address_components.filter(
 *        x => x.types.filter(t => t === 'administrative_area_level_2').length > 0)[0].short_name; 
 *        console.log(locationName); 
 *        this.setState({ location: locationName, }) }) //nearby api 
 
 *        var apiPlaceskey = ''; 
 *         
 *        //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY 
 *        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' 
 *            + position.coords.latitude 
 *            + ',' 
 *            + position.coords.longitude 
 *            + '&radius=2000&type=bus_station&key=' 
 *            + apiPlaceskey) 
 *              .then((respplaces) => respplaces.json()) 
 *              .then((responseJson2) => { 
 *                  const markers = responseJson2.results.map(
 *                      (result) => ({ 
 *                          latlng: { 
 *                            latitude: result.geometry.location.lat, 
 *                            longitude: result.geometry.location.lng, 
 *                          } 
 *                      })); 
 *                    this.setState({ markers }); }); }, 
 *                    (error) => this.setState({error: error.message}),
 *                    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}, ); } 
 */
