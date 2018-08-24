import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";

import Icon from "react-native-vector-icons/dist/FontAwesome";

export default class Settings extends React.Component {
  static navigationOptions = {
    header: null,
    drawerIcon: () => (
      <View>
        <Icon 
            name="cog"
            size={20}
            color={"black"}
        />
      </View>
    ),
  };
  render() {
    return (
      <View>
      <Header
        leftComponent={
          <Icon
            name="bars"
            size={30}
            color="white"
            onPress={() => this.props.navigation.openDrawer()} //goBack() - openDrawer()
          />
        }
        centerComponent={{
          text: "SETTINGS",
          style: {
            color: "#fff",
            fontSize: 30,
            width: "100%",
            textAlign: "center",
          },
        }}
      />
    </View>
    );
  }
}
