import React from "react";
import { View, Text, Image } from "react-native";

import Icon from "react-native-vector-icons/dist/FontAwesome";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#4682B4",
        }}
      >
        <Image
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 150,
            width: 150,
          }}
          source={require("../image/logo.png")}
        />

        <View style={{ flexDirection: "row" }}> 
          <Icon name="home" size={30} style={{ color: "white" }} />
          <Text style={{ fontSize: 20, color: "white" }}> HOME </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="user" size={30} style={{ color: "white" }} />
          <Text style={{ fontSize: 20, color: "white" }}> PROFILE </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="cog" size={30} style={{ color: "white" }} />
          <Text style={{ fontSize: 20, color: "white" }}> SETTINGS </Text> 
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="car" size={30} style={{ color: "white" }} />
          <Text style={{ fontSize: 20, color: "white" }}> TRACKING </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="map" size={30} style={{ color: "white" }} />
          <Text style={{ fontSize: 20, color: "white" }}> MAPS </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="bell" size={30} style={{ color: "white" }} />
          <Text style={{ fontSize: 20, color: "white" }}> NOTIFICATION </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name="sign-out" size={30} style={{ color: "white" }} />
          <Text style={{ fontSize: 20, color: "white" }} onPress={() => this.props.navigation.navigate('FormLogin')}> EXIT </Text>
        </View>
      </View>
    );
  }
}




